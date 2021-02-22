import moment from 'moment';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ChatRoom } from '../../types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export type ChatListItemProps = {
    chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
    const {chatRoom} = props;
    const user = chatRoom.users[1];
    const navigation = useNavigation();
    const onClick = () => {
        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: user.name
        });
    }
    return (
        <Pressable style={styles.container} onPress={onClick}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={1} style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>
            
            <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
            {/* <Text style={styles.time}>Yesterday</Text> */}
        </Pressable>
    )
};

export default ChatListItem;
