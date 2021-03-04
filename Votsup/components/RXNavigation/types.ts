import type { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import { MaterialTopTabDescriptorMap, MaterialTopTabNavigationConfig, MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import { DefaultNavigatorOptions, EventMapBase, NavigationHelpers, NavigationState, ParamListBase, Route, RouteConfig, TabNavigationState } from "@react-navigation/native";
import { SceneRendererProps } from "react-native-tab-view";
import { Listener } from "react-native-tab-view/lib/typescript/src/types";
import TabView from './RXTabView';

// New Props type for RXTopTabBar component
export type RXTopTabBarProps = RXTopTabBarOptions & SceneRendererProps & {
    state: TabNavigationState<ParamListBase>;
    navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
    descriptors: MaterialTopTabDescriptorMap;
};

// Options for tabbar inner header
export type RXTopTabBarHeaderOptions = {
    headerShown?: boolean;

} & RXTabBarHeaderProps;

// New tabBarOptions prop of MaterialTopTabNavigator
export type RXTopTabBarOptions = MaterialTopTabBarOptions & {
    headerOptions?: RXTopTabBarHeaderOptions
}

// New Props for RXTopTabNavigator
export type RXTopTabNavigationConfig = Partial<Omit<React.ComponentProps<typeof TabView>, 'navigationState' | 'onIndexChange' | 'onSwipeStart' | 'onSwipeEnd' | 'renderScene' | 'renderTabBar' | 'renderPager' | 'renderLazyPlaceholder'>> & {
    /**
     * Function that returns a React element to use as the pager.
     * The pager handles swipe gestures and page switching.
     */
    pager?: React.ComponentProps<typeof TabView>['renderPager'];
    /**
     * Function that returns a React element to render for routes that haven't been rendered yet.
     * Receives an object containing the route as the prop.
     * The lazy prop also needs to be enabled.
     *
     * This view is usually only shown for a split second. Keep it lightweight.
     *
     * By default, this renders null.
     */
    lazyPlaceholder?: (props: {
        route: Route<string>;
    }) => React.ReactNode;
    /**
     * Function that returns a React element to display as the tab bar.
     */
    tabBar?: (props: RXTopTabBarProps) => React.ReactNode;
    /**
     * Options for the tab bar which will be passed as props to the tab bar component.
     */
    tabBarOptions?: RXTopTabBarOptions;
    /**
     * Position of the tab bar. Defaults to `top`.
     */
    tabBarPosition?: 'top' | 'bottom';
};

// New props for RXTabBar Header
export type RXTabBarHeaderProps = {
    title?: string;
    titleAlign?: string;
    tintColor?: string;
    headerRight?: (props: { tintColor?: string }) => React.ReactNode;
}

// new props for EventEmitter
export type RXEventEmitterProps = {
    addListener: (type: 'enter' | 'leave', listener: Listener) => void;
    removeListener: (type: 'enter' | 'leave', listener: Listener) => void;
  };

  // New props for Screen
export type RXRouteConfig<ParamList extends ParamListBase, RouteName extends keyof ParamList, State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase> = RouteConfig<ParamList , RouteName, State, ScreenOptions, EventMap> & {
    sticky?: boolean
}

// New props for Navigator
export type RXTypedNavigator<
  ParamList extends ParamListBase,
  State extends NavigationState,
  ScreenOptions extends {},
  EventMap extends EventMapBase,
  Navigator extends React.ComponentType<any>
> = {
  /**
   * Navigator component which manages the child screens.
   */
  Navigator: React.ComponentType<
    Omit<
      React.ComponentProps<Navigator>,
      keyof DefaultNavigatorOptions<any, any>
    > &
      DefaultNavigatorOptions<ScreenOptions, ParamList>
  >;
  /**
   * Component used for specifying route configuration.
   */
  Screen: <RouteName extends keyof ParamList>(
    _: RXRouteConfig<ParamList, RouteName, State, ScreenOptions, EventMap>
  ) => null;
};



