import React from 'react';
import { MARGIN, SIZE } from '@/common/exports';
import { StyleSheet, Text, View } from 'react-native';
import { appleBlue, appleGreen, appleRed } from '@/components/Themed';

export default function Box({ count, backgroundColor }: any) {
  const colors = [appleBlue, appleRed, appleGreen];
  if (!backgroundColor) backgroundColor = colors[count % colors.length];
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{count + 1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    margin: MARGIN,
    borderRadius: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});