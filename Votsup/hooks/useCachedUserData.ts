import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserData} from '../types';

export default function useCachedUserData() {
  const [userData, setUserData] = React.useState<UserData>({
    user: {
      allowPolicy: false
    }
  } as UserData);

  React.useEffect(() => {
    async function loadUserDataAsync() {
      let data;
      try {
        let cachedData = await AsyncStorage.getItem("user_data");
        if(!!cachedData){
          data = JSON.parse(cachedData) as UserData;
          setUserData(data);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    loadUserDataAsync();
  }, []);

  return userData;
}
