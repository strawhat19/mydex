import React from 'react';
import { MARGIN, SIZE } from '@/common/exports';
import { StyleSheet, Text, View } from 'react-native';
import { appleBlue, appleGreen } from '@/components/Themed';

export default function Box({count}: any) {
  const backgroundColor = count % 2 === 0 ? appleBlue : appleGreen;
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE - MARGIN,
    height: SIZE - MARGIN,
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cde9e4',
  },
});