import { Layout } from '@react-navigation/stack/lib/typescript/src/types';
import * as React from 'react';
import { Animated, View, StyleSheet, StyleProp, ViewStyle, Platform } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { RXTabBarHeaderProps } from '../types';
import RXHeader from './RXHeader';

export type Props = RXTabBarHeaderProps & {
  layout: Layout;
  // insets: EdgeInsets;
  headerConfig: RXTabBarHeaderProps;
  style?: StyleProp<ViewStyle>;
};

const getDefaultHeaderHeight = (
  layout: Layout,
  statusBarHeight: number
): number => {
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (Platform.OS === 'ios') {
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + statusBarHeight;
};

export default function HeaderContainer({
  style,
  // insets,
  ...rest
}: Props) {

  return (
    <Animated.View pointerEvents="box-none" style={style}>
      <RXHeader {...rest} />
    </Animated.View>
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
