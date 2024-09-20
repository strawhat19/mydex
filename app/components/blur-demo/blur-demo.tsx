import React from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomImage from '@/components/custom-image/custom-image';
import { vertImages } from '@/components/Themed';

export default function BlurExample() {
  return (
    <View style={styles.container}>
      {/* Background image */}
      <CustomImage
        alt={`blur-img`}
        source={{ uri: vertImages.hand_leaf }}
        style={styles.image}
      />

      {/* Blurred overlay */}
      <BlurView intensity={50} style={styles.blurContainer}>
        <Text style={styles.text}>This is a blurred view!</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    position: 'absolute',
  },
  blurContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});