import * as React from 'react';
import { Animated, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';


export type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function HeaderContainer({
  style,
}: Props) {

  return (
    <View pointerEvents="box-none" style={style}>
        
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
