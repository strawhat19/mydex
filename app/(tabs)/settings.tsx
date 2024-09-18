import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Camera API
import * as Battery from 'expo-battery';          // Battery API
import * as Location from 'expo-location';        // Location API
import * as Notifications from 'expo-notifications'; // Notifications API

export default function Settings() {
  const [batteryLevel, setBatteryLevel] = useState<any>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchBatteryLevel();
    const batteryLevelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(Math.round(batteryLevel * 100));
    });
    return () => {
      batteryLevelSubscription.remove();
    };
  }, []);

  async function fetchBatteryLevel() {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(Math.round(batteryLevel * 100));
  }

  async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  // Example: Camera Access
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

  // Example: Location Access
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    Alert.alert('Location Retrieved', `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
  };

  // Example: Send Local Notification
  const sendNotification = async () => {
    await Notifications.requestPermissionsAsync();
    Notifications.scheduleNotificationAsync({
      content: {
        title: `You've got mail! 📬`,
        body: 'This is a test notification',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor={`#eee`} darkColor={`rgba(255,255,255,0.1)`} />

       {/* Battery Status Card */}
       <View style={styles.card}>
        <Text style={styles.cardTitle}>Battery Status</Text>
        <Text style={styles.cardContent}>{batteryLevel ? `${batteryLevel}%` : 'Fetching...'}</Text>
      </View>

      {/* Buttons for accessing native APIs */}
      <View style={styles.buttonContainer}>
        <Button title={`Open Camera`} onPress={openCamera} />
        <Button title={`Get Location`} onPress={getLocation} />
        <Button title={`Send Notification`} onPress={sendNotification} />
      </View>
    </View>
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