import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const NewMessageButton = () => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Contacts');
    }
    return (
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <MaterialCommunityIcons
            name="message-reply-text"
            size={28}
            color="white"
          />
        </Pressable>
      </View>
    );
};

export default NewMessageButton;
