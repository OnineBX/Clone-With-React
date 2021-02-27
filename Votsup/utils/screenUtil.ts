import {Dimensions, PixelRatio} from 'react-native';

let basePx = 375;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// const fontScale = deviceWidth / 320;

export const px2dp = (px: number) => {
    return px * deviceWidth / basePx;
}

export const sp2px = (sp: number) => {
    return PixelRatio.get() * PixelRatio.getFontScale() * sp;
}

export const screenWidth = ():number => {
    return deviceWidth;
}

export const screenHeight = (): number => deviceHeight;