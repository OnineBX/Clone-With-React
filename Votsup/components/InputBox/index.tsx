import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import styles from './styles';

const InputBox = () => {
    const [message, setMessage] = useState("");
    const onPress = () => {
        if(!message) {
            console.log("Open Microphone");
        }else{
            console.log("Sending message ");
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                <TextInput 
                    placeholder="Type a message"
                    style={styles.input}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
                <Entypo style={styles.icon} name="attachment" size={24} color="grey" />
                {!message && <Fontisto style={styles.icon} name="camera" size={24} color="grey" />}
            </View>
            <Pressable onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {
                        !message ? <MaterialCommunityIcons name="microphone" size ={24} color="white" /> : <MaterialIcons name="send" size={24} color="white" />
                    }
                </View>
            </Pressable>
        </View>
    )
};

export default InputBox;
