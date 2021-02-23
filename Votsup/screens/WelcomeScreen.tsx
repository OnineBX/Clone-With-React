import React, {useEffect} from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import px2dp from '../utils/screenUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomdeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('user_data', JSON.stringify({
                user: {
                    allowPolicy: true
                }
            }));
            console.log("User has agreed the policy");
        } catch (error) {
            console.log(error);
        }
    };
    const onAgreePolicy = () => {
        
        storeData();
        navigation.replace('Root');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/welcome.png')} style={styles.image} />
            </View>
            <Text style={styles.title}>Welcome to WhatsApp</Text>
            <Text style={styles.policy}>{"Read our Privacy Policy. Tap \"Agree & Continue\""}</Text>
            <Text style={styles.policy}>to accept the Terms of Service.</Text>
            <Pressable onPress={onAgreePolicy}>
                <Text style={styles.agree}>{"Agree & Continue"}</Text>
            </Pressable>
            
            <Text style={styles.from}>from</Text>
            <Text style={styles.facebook}>F A C E B O O K</Text>
        </View>
    )
};

export default WelcomdeScreen;

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        paddingHorizontal: px2dp(50),
        marginTop: px2dp(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    title: {
        alignSelf: 'center',
        fontSize: px2dp(28),
        fontWeight: 'bold',
        marginBottom: px2dp(20)
    },
    policy: {
        alignSelf: 'center',
        fontSize: px2dp(14)
    },
    agree: {
        alignSelf: 'center',
        marginVertical: px2dp(30),
        color: '#2d95c0',
        fontSize: px2dp(24),
        fontWeight: 'bold'
    },
    from: {
        alignSelf: 'center',
        color: 'grey',
        fontSize: px2dp(16)
    },
    facebook: {
        alignSelf: 'center',
        color: '#46ba6c',
        fontSize: px2dp(18),
        fontWeight: 'bold'
    }
  });
