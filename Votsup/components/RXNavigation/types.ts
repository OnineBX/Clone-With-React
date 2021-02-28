import type { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import { MaterialTopTabDescriptorMap, MaterialTopTabNavigationConfig, MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import { NavigationHelpers, ParamListBase, Route, TabNavigationState } from "@react-navigation/native";
import { SceneRendererProps, TabView } from "react-native-tab-view";

// New Props type for RXTopTabBar component
export type RXTopTabBarProps = RXTopTabBarOptions & SceneRendererProps & {
    state: TabNavigationState<ParamListBase>;
    navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
    descriptors: MaterialTopTabDescriptorMap;
};

// Options for tabbar inner header
export type RXTopTabBarHeaderOptions = {
    headerShown?: boolean;
    title?: string
}

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
    title?: string
}




