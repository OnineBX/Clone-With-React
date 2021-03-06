import mongoose from 'mongoose';

const votsupSchema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    reveived: Boolean
})

export default mongoose.model('messagecontents', votsupSchema);