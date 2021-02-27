import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RXHeader = () => {
    return (
        <View style={styles.container}>
            <Text>Header</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        minHeight: 48
    }
})


export default RXHeader;
