import React from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '@/components/Themed';
import { StyleSheet, Alert, Button } from 'react-native';
import DragNDrop from '../components/drag-and-drop/dndyt/dndyt';

export default function Settings() {
  
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      let result: any = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        if (result.uri != undefined && result.uri != null && result.uri != `` && result.uri.length > 0) {
          Alert.alert("Photo Taken", result.uri);
        } else {
          Alert.alert("Canceled Camera");
        }
      }
    } else {
      Alert.alert('Permission Denied', 'Camera access is required.');
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    Alert.alert('Location Retrieved', `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
  };

  return (
    <DragNDrop />
    // <View style={styles.container}>
    //   <Text style={styles.title}>Settings</Text>
    //   <View style={styles.separator} lightColor={`#eee`} darkColor={`rgba(255,255,255,0.1)`} />
    //   <View style={styles.buttonContainer}>
    //     <Button title={`Open Camera`} onPress={openCamera} />
    //     <Button title={`Get Location`} onPress={getLocation} />
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});