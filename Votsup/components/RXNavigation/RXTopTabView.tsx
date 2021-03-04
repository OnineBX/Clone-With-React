import * as React from "react";
import { SceneRendererProps } from "react-native-tab-view";
import {
  NavigationHelpersContext,
  TabNavigationState,
  TabActions,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";

import TopTabBar from "./RXTopTabBar";
import TabView from './RXTabView';

import type {
  MaterialTopTabDescriptorMap,
  MaterialTopTabNavigationConfig,
  MaterialTopTabNavigationHelpers,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import { RXTopTabBarProps, RXTopTabNavigationConfig } from "./types";

type Props = RXTopTabNavigationConfig & {
  state: TabNavigationState<ParamListBase>;
  navigation: MaterialTopTabNavigationHelpers;
  descriptors: MaterialTopTabDescriptorMap;
  tabBarPosition?: "top" | "bottom";
};

export default function RXTopTabView({
  pager,
  lazyPlaceholder,
  tabBar = (props: RXTopTabBarProps) => <TopTabBar {...props} />,
  tabBarOptions,
  state,
  navigation,
  descriptors,
  sceneContainerStyle,
  ...rest
}: Props) {
  const { colors } = useTheme();

  const renderTabBar = (props: SceneRendererProps) => {
    return tabBar({
      ...tabBarOptions,
      ...props,
      state: state,
      navigation: navigation,
      descriptors: descriptors,
    });
  };

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <TabView
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
          onSwipeStart={() => navigation.emit({ type: "swipeStart" })}
          onSwipeEnd={() => navigation.emit({ type: "swipeEnd" })}
          sceneContainerStyle={[
            { backgroundColor: colors.background },
            sceneContainerStyle,
          ]}
        />
    </NavigationHelpersContext.Provider>
  );
}
