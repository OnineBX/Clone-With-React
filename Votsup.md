# Whatsapp Camera Screen & Navigation Animation

## Source code analysis

**createMaterialTopTabNavigator:** react-navigation/packages/material-top-tabs/src/navigators/createMaterialTopTabNavigator.tsx

* MaterialTopTabNavigator is ***MaterialTopTabView***

**createNavigatorFactory:** react-navigation/packages/core/src/createNavigatorFactory.tsx

**MaterialTopTabView:** react-navigation/packages/material-top-tabs/src/views/MaterialTopTabView.tsx

* is ***TabView*** wrappered by NavigationHelpersContext.Provider
* has ***pager: *** & ***tabBar***

**TabView:** react-native-tab-view/src/TabView.tsx <mark>定义 position属性</mark>

**Pager:** react-native-tab-view/src/Pager.tsx

=========================
**createStackNavigator:** react-navigation/packages/stack/src/navigators/createStackNavigator.tsx
**StackView:** react-navigation/packages/stack/src/views/Stack/StackView.tsx
