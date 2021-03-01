import React from 'react';
import { View, Text, StyleSheet, Platform, ViewStyle } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { RXTabBarHeaderProps } from '../types';



const RXHeader = (props: RXTabBarHeaderProps & {insets: EdgeInsets}) => {
    const {
        insets,
        title, 
        titleAlign = Platform.select({
            ios: 'center',
            default: 'left',
          }),
        tintColor,
        headerRight,
    } = props;

    // titleAlign == 'left' ?
    // {
    //     position: 'absolute',
    //     left: 16 + insets.left,
    //     right: (rightButton ? 72 : 16) + insets.right,
    //   }
    // : {
    //     marginHorizontal:
    //     16 +
    //       (leftButton && headerBackTitleVisible !== false
    //         ? 40
    //         : 0) +
    //       Math.max(insets.left, insets.right),
    //   },
    const titleStyle = {
        color: tintColor === undefined ? 'black' : tintColor
    } as ViewStyle;

    const rightButton = headerRight ? headerRight({ tintColor }) : null;

    return (
        <View style={[styles.container, {top: insets.top}]}>
            <Text numberOfLines={1}
                style={[titleStyle, styles.title, 
                titleAlign == 'left' ? {
                    position: 'absolute',
                    left: 16 + insets.left,
                    right: (rightButton ? 72 : 16) + insets.right,
                    }
                    :
                    {
                        marginHorizontal: 16 +Math.max(insets.left, insets.right),
                    }]}>
                        {title}
            </Text>
            {rightButton ? (
            <View
              pointerEvents="box-none"
              style={[
                styles.right,
                { right: insets.right },
                
              ]}
            >
              {rightButton}
            </View>
          ) : null}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width:'100%',
        height:'100%',
        alignItems:'center',
    },
    title: Platform.select({
        ios: {
          fontSize: 17,
          fontWeight: '600',
        },
        android: {
          fontSize: 20,
          fontFamily: 'sans-serif-medium',
          fontWeight: 'normal',
        },
        default: {
          fontSize: 18,
          fontWeight: '500',
        },
      }),
      right: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
})


export default RXHeader;
