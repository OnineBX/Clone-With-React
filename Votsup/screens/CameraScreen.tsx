import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {Camera} from 'expo-camera';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {screenHeight} from '../utils/screenUtil';
import { SceneRendererProps } from 'react-native-tab-view';

const CameraScreen = () => {
    
    const isFocus = useIsFocused();
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const cameraView = (<View style={styles.container} >
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
    </View>);
    const renderCamera = async ()=> {
      return cameraView;
    }
    const emptyView = (<View style={{width:'100%', height:'100%', backgroundColor:'black'}}><Text>No Permission</Text></View>);
    const renderEmpty = async ()=> {
      return emptyView;
    }

    return hasPermission ? cameraView : emptyView;
    
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

