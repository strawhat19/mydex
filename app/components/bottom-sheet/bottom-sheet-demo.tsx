import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import CustomImage from '@/components/custom-image/custom-image';
import BottomSheet, { BottomSheetRefProps } from './bottom-sheet';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appleBlue, appleGreen, Text, vertImages } from '@/components/Themed';
import { web } from '@/shared/shared';

export default function BottomSheetDemo() {
  const ref = useRef<BottomSheetRefProps>(null);
  const [blurIntensity, setBlurIntensity] = useState(0); // Default blur intensity

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  const handleDragPercentageChange = (percent: number) => {
    const newIntensity = (percent / 100) * 50; // Scale intensity between 50 and 100
    setBlurIntensity(newIntensity);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, width: `100%` }}>
      <View style={[styles.container, { flex: 1, width: `100%` }]}>
        <StatusBar style={`dark`} />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Press for Menu</Text>
        </TouchableOpacity>
        <View style={blurStyles.container}>
          <CustomImage
            alt={`blur-img`}
            id={`bgImageToBlur`}
            style={blurStyles.image}
            source={{ uri: vertImages.hand_leaf }}
          />
          <BlurView intensity={blurIntensity} style={blurStyles.blurContainer} />
        </View>
        <BottomSheet ref={ref} onDragPercentageChange={handleDragPercentageChange}>
          <View style={{ flex: 1, backgroundColor: appleBlue }} />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: `100%`,
    aspectRatio: 1,
    display: `flex`,
    minWidth: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: appleGreen,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 700,
  }
});

const blurStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: web() ? `100%` : `100%`,
  },
  image: {
    height: `100%`,
    position: 'absolute',
    width: web() ? `auto` : `100%`,
  },
  blurContainer: {
    flex: 1,
    width: `100%`,
    height: `100%`,
    borderRadius: 20,
    minWidth: `100%`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});