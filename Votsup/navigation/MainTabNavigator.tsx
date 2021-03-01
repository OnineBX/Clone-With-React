import { Ionicons, Fontisto, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChatsScreen from "../screens/ChatsScreen";
import CameraScreen from "../screens/CameraScreen";
import { MainTabParamList, TabOneParamList, ChatsParamList } from "../types";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { sp2px, screenWidth } from "../utils/screenUtil";
import {
  GestureHandlerGestureEventNativeEvent,
  PanGestureHandler,
  PanGestureHandlerEventExtra, 
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import Animated, { block, event } from "react-native-reanimated";
import { xyz } from "color";
import { transform } from "@babel/core";
import ContactsScreen from "../screens/ContactsScreen";

import RXTopTabBar from "../components/RXNavigation/RXTopTabBar";
import RXPager from "../components/RXNavigation/RXPager";
import createRXTopTabNavigator from "../components/RXNavigation/createRXTopTabNavigator";

// const MainTab = createRXTopTabNavigator<MainTabParamList>();
const MainTab = createRXTopTabNavigator<MainTabParamList>();

export default function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      style={{
        backgroundColor: 'white'
      }}
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 3,
        },
        labelStyle: {
          fontWeight: "bold",
        },
        tabStyle: {
          width: "auto",
          margin:0,
        },
        headerOptions:{
          headerShown: true,
          title: "Votsup",
          tintColor: Colors.light.background,
          headerRight: () => (
          <View style={{
            flexDirection: 'row', 
            width: 60, 
            justifyContent: 'space-between', marginRight:10
            }}>
            <Octicons name="search" size={22} color='white'/>
            <MaterialCommunityIcons name="dots-vertical" size={22} color='white' />
          </View>
          )
        },
        showIcon: true,
        
      }}
      pager={props => <RXPager {...props} />}
      
    >
      <MainTab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="camera" color={color} size={18} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{
          tabBarLabel: () => <Text style={styles.tabText}>Chats</Text>,
        }}
      />
      <MainTab.Screen
        name="Status"
        component={ContactsScreen}
        options={{ 
          tabBarLabel: () => <Text style={styles.tabText}>Status</Text>,
        }}
      />
      <MainTab.Screen
        name="Calls"
        component={TabOneNavigator}
        options={{
          tabBarLabel: () => <Text style={styles.tabText}>Calls</Text>,
        }}
      />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

let f = (a: number & {}) => a;

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={ChatsScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<ChatsParamList>();

function ChatsNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabText: {
    color: "white",
    textAlign: "center",
    width: (screenWidth() - 80 - 30) / 3,
  }
});
