import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.light.tint,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
