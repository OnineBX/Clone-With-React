import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';

import mongoose from 'mongoose';
import Pusher from 'pusher'
import Message from './dbMessage';

// app config
const NAMESPACE = 'Server';
const app = express();

const pusher = new Pusher({
  appId: "1166642",
  key: "e5f47f92b310c18028d6",
  secret: "378e44d6ac3a0c84ede0",
  cluster: "ap1",
  useTLS: true
});

// middleware
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP-[${req.socket.remoteAddress}]`);
    next();
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "*");
    next();
})


// DB config
const connection_url = 'mongodb+srv://admin:XaI50ODOnfqCbqXG@cluster0.icdch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    logging.info(NAMESPACE, "DB connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change) => {
        logging.info(NAMESPACE, "A Change occured", [change]);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message
            })
        }else{
            logging.error(NAMESPACE, "Error triggering Pusher");
        }
        
    })
})

/** api routes */
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Message.find((err: any, data: any) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    
    Message.create(dbMessage, (err: any, data: any) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(`new message created: \n ${data}`);
        }
    })
})

/** Create the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}: ${config.server.port}`));
