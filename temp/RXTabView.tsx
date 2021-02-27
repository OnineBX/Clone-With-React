import * as React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import TabBar, { Props as TabBarProps } from 'react-native-tab-view/src/TabBar';
import SceneView from 'react-native-tab-view/src/SceneView';
import {
  Layout,
  NavigationState,
  Route,
  SceneRendererProps,
  PagerCommonProps,
} from 'react-native-tab-view/src/types';
import RXPager, { Props as ChildProps } from './RXPager';
import RXTabBar from './RXTabBar';
import memoize from 'react-native-tab-view/src/memoize';
import { useNavigationState } from '@react-navigation/native';
import RXHeaderContainer from './RXInnerHeader/RXHeaderContainer';

// InnerHeader: Same Implementation
import type { Props as HeaderContainerProps } from '@react-navigation/stack/src/Views/Header/HeaderContainer';
import { RXInnerHeaderContainerProps } from './RXTypes';

export type Props<T extends Route> = PagerCommonProps & {
  position?: Animated.Value<number>;
  onIndexChange: (index: number) => void;
  navigationState: NavigationState<T>;
  renderScene: (
    props: SceneRendererProps & {
      route: T;
    }
  ) => React.ReactNode;
  renderLazyPlaceholder: (props: { route: T }) => React.ReactNode;
  renderTabBar: (
    props: SceneRendererProps & {
      navigationState: NavigationState<T>;
    }
  ) => React.ReactNode;
  tabBarPosition: 'top' | 'bottom';
  initialLayout?: { width?: number; height?: number };
  lazy: boolean;
  lazyPreloadDistance: number;
  removeClippedSubviews?: boolean;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  gestureHandlerProps: React.ComponentProps<typeof PanGestureHandler>;
  renderPager: (props: ChildProps<T>) => React.ReactNode;
};

type State = {
  layout: Layout;
};

const GestureHandlerWrapper = GestureHandlerRootView ?? View;

export default class TabView<T extends Route> extends React.Component<
  Props<T>,
  State
> {
  static defaultProps = {
    tabBarPosition: 'top',
    renderTabBar: <P extends Route>(props: TabBarProps<P>) => (
      <RXTabBar {...props} />
    ),
    renderLazyPlaceholder: () => null,
    keyboardDismissMode: 'auto',
    swipeEnabled: true,
    lazy: false,
    lazyPreloadDistance: 0,
    removeClippedSubviews: false,
    springConfig: {},
    timingConfig: {},
    gestureHandlerProps: {},
    renderPager: (props: ChildProps<any>) => <RXPager {...props} />,
  };

  state = {
    layout: { width: 0, height: 0, ...this.props.initialLayout },
  };

  private jumpToIndex = (index: number) => {
    if (index !== this.props.navigationState.index) {
      this.props.onIndexChange(index);
    }
  };

  private handleLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;

    if (
      this.state.layout.width === width &&
      this.state.layout.height === height
    ) {
      return;
    }

    this.setState({
      layout: {
        height,
        width,
      },
    });
  };

  // Support Header component
  private renderInnerHeader = (props: RXInnerHeaderContainerProps) => <RXHeaderContainer {...props} />;

  render() {
    const {
      position: positionListener,
      onSwipeStart,
      onSwipeEnd,
      navigationState,
      lazy,
      lazyPreloadDistance,
      removeClippedSubviews,
      keyboardDismissMode,
      swipeEnabled,
      swipeVelocityImpact,
      timingConfig,
      springConfig,
      tabBarPosition,
      renderTabBar,
      renderScene,
      renderLazyPlaceholder,
      sceneContainerStyle,
      style,
      gestureHandlerProps,
      springVelocityScale,
      renderPager,
    } = this.props;
    const { layout } = this.state;

    return (
      <GestureHandlerWrapper
        onLayout={this.handleLayout}
        style={[styles.pager, style]}
      >
        {renderPager({
          navigationState,
          layout,
          keyboardDismissMode,
          swipeEnabled,
          swipeVelocityImpact,
          timingConfig,
          springConfig,
          onSwipeStart,
          onSwipeEnd,
          onIndexChange: this.jumpToIndex,
          springVelocityScale,
          removeClippedSubviews,
          gestureHandlerProps,
          children: ({
            position,
            render,
            addListener,
            removeListener,
            jumpTo,
          }) => {
            // All of the props here must not change between re-renders
            // This is crucial to optimizing the routes with PureComponent
            const sceneRendererProps = {
              position,
              layout,
              jumpTo,
            };

            return (
              <React.Fragment>
                {positionListener ? (
                  <Animated.Code
                    exec={Animated.set(positionListener, position)}
                  />
                ) : null}
                {this.renderInnerHeader({})}
                {tabBarPosition === "top" &&
                  renderTabBar({
                    ...sceneRendererProps,
                    navigationState,
                  })}
                {render(
                  navigationState.routes.map((route, i) => {
                    return (
                      <SceneView
                        {...sceneRendererProps}
                        addListener={addListener}
                        removeListener={removeListener}
                        key={route.key}
                        index={i}
                        lazy={lazy}
                        lazyPreloadDistance={lazyPreloadDistance}
                        navigationState={navigationState}
                        style={sceneContainerStyle}
                      >
                        {({ loading }) =>
                          loading
                            ? renderLazyPlaceholder({ route })
                            : renderScene({
                                ...sceneRendererProps,
                                route,
                              })
                        }
                      </SceneView>
                    );
                  })
                )}
                {tabBarPosition === "bottom" &&
                  renderTabBar({
                    ...sceneRendererProps,
                    navigationState,
                  })}
              </React.Fragment>
            );
          },
        })}
      </GestureHandlerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    overflow: 'hidden',
  },
});