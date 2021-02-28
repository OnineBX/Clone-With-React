import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import {Octicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5} from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, UserData } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from '../constants/Colors';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ContactsScreen from '../screens/ContactsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Users from '../data/Users';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme, userData }: { colorScheme: ColorSchemeName; userData: UserData }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator cachedData={userData}/>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

type ChatRoomRoute ={

}

function RootNavigator({cachedData} : {cachedData : UserData}) {
  const {user} = cachedData;
   
  return (
    <Stack.Navigator
     screenOptions={{ 
      headerStyle: {
        backgroundColor: Colors.light.tint,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
    initialRouteName={ user.allowPolicy ? "Root" : "Welcome"}
    >
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Root" component={MainTabNavigator}
      options={{
        title:"Votsup",
        headerShown: false,
      }} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={
        ({route}) => ({
        title: route.params.name,
        headerShown: true,
        headerRight: () => (
          <View style={{
            flexDirection: 'row', 
            width: 100, 
            justifyContent: 'space-between', marginRight:10
            }}>
            <MaterialIcons name="call" size={22} color={'white'} />
            <FontAwesome5 name="video" size={22} color={'white'} />
            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
          </View>
        )
      })} />
      <Stack.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Contacts' }} />
      
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
