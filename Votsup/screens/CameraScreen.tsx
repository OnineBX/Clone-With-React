import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {Camera} from 'expo-camera';

import {useNavigation} from '@react-navigation/native';
import {screenHeight} from '../utils/screenUtil';
import { SceneRendererProps } from 'react-native-tab-view';

const CameraScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
          
        });
    
        return unsubscribe;
      }, [navigation]);

      

    return (hasPermission ? 
        (<View style={styles.container}>
            <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}>
                  <Text style={styles.text}> Flip </Text>
                </Pressable>
              </View>
            </Camera>
          </View>) :
        (<View><Text>No Permission</Text></View>)
    )
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1
      // position: 'absolute',
      // top:-48,
      // overflow: 'visible',
        // width: '100%',
        // height: '100%'
        // height: screenHeight()+48
    },
    camera: {
        width: '100%',
        height:'100%'
    }
});

