import moment from 'moment';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { User } from '../../types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export type ContactListItemProps = {
    user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
    const {user} = props;
    const navigation = useNavigation();
    const onClick = () => {
        navigation.navigate('ContactRoom', {
            
        });
    }
    return (
        <Pressable style={styles.container} onPress={onClick}>
            <View style={styles.leftContainer}>
                <Image source={{uri: user.imageUri}} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.status} numberOfLines={2}>{user.status}</Text>
                </View>
            </View>
        </Pressable>
    )
};

export default ContactListItem;
