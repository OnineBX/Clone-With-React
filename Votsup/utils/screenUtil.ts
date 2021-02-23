import {Dimensions} from 'react-native';

let basePx = 375;
const deviceWidth = Dimensions.get('window').width;

export default (px: number) => {
    return px * deviceWidth / basePx;
}