import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RXTabBarHeaderProps } from '../types';



const RXHeader = (props: RXTabBarHeaderProps) => {
    console.log(props.title)
    return (
        <View style={styles.container}>
            <Text>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        minHeight: 48,
        justifyContent:'center'
    }
})


export default RXHeader;
