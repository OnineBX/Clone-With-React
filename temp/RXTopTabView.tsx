import * as React from 'react';
import { TabView, SceneRendererProps } from 'react-native-tab-view';
import {
  NavigationHelpersContext,
  TabNavigationState,
  TabActions,
  ParamListBase,
  useTheme,
  useNavigationState,
} from '@react-navigation/native';

import RXTopTabBar from './RXTopTabBar';
import type {
  MaterialTopTabDescriptorMap,
  MaterialTopTabNavigationHelpers,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs/src/types';
import RXTabView from './RXTabView';
import Animated from 'react-native-reanimated';
import { RXTopTabNavigationConfig } from './RXTypes';

type Props = RXTopTabNavigationConfig & {
  state: TabNavigationState<ParamListBase>;
  navigation: MaterialTopTabNavigationHelpers;
  descriptors: MaterialTopTabDescriptorMap;
  tabBarPosition?: 'top' | 'bottom';
};

export default function RXTopTabView({
  pager,
  lazyPlaceholder,
  tabBar = (props: MaterialTopTabBarProps) => <RXTopTabBar {...props} />,
  tabBarOptions,
  headerOptions,
  state,
  navigation,
  descriptors,
  sceneContainerStyle,
  ...rest
}: Props) {
  const { colors } = useTheme();

  const renderTabBar = (props: SceneRendererProps) => {
    return tabBar({
      ...headerOptions,
      ...tabBarOptions,
      ...props,
      state: state,
      navigation: navigation,
      descriptors: descriptors,
    });
  };

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <RXTabView
        {...rest}
        onIndexChange={(index) =>
          navigation.dispatch({
            ...TabActions.jumpTo(state.routes[index].name),
            target: state.key,
          })
        }
        renderScene={({ route }) => descriptors[route.key].render()}
        navigationState={state}
        renderTabBar={renderTabBar}
        renderPager={pager}
        renderLazyPlaceholder={lazyPlaceholder}
        onSwipeStart={() => navigation.emit({ type: 'swipeStart' })}
        onSwipeEnd={() => navigation.emit({ type: 'swipeEnd' })}
        sceneContainerStyle={[
          { backgroundColor: colors.background },
          sceneContainerStyle,
        ]}
      />
    </NavigationHelpersContext.Provider>
  );
}
