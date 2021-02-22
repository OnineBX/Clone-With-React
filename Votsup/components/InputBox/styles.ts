import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        padding: 10,
        margin: 10,
        borderRadius: 25,
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
        
    },
    icon: {
        marginHorizontal: 5
    }
    
});

export default styles;
