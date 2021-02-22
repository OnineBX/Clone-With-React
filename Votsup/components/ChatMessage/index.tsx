import moment from 'moment';
import React from 'react';
import { View, Text } from 'react-native';
import { Message } from '../../types';
import styles from './styles';

export type ChatMessageProps = {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const { message } = props;
    const isOwn = () => {
        return message.user.id === 'u1';
    }
    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isOwn() ? '#dff8c5' : 'white',
                    marginLeft: isOwn() ? 50 : 0,
                    marginRight: isOwn() ? 0 : 50
                }
                ]}>
                {!isOwn() && <Text style={styles.name}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
        
    )
};

export default ChatMessage;
