import { BlurView } from 'expo-blur';
import { web } from '@/shared/shared';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import CustomImage from '@/components/custom-image/custom-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { appleGreen, Text, vertImages } from '@/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps, MAX_TRANSLATE_Y } from './bottom-sheet';

export const animationDuration = 300;

export default function BottomSheetDemo() {
  const ref = useRef<BottomSheetRefProps>(null);
  const [blurIntensity, setBlurIntensity] = useState(0);
  // const blurBGContainerOpacity = useRef(new Animated.Value(0)).current; // Animated value for blur opacity

  const programmaticDrag = (targetPosition: number) => {
    'worklet';  // Worklet allows the function to run on the UI thread
    ref.current?.scrollTo({destination: targetPosition, resetBlur: targetPosition != 0} as any);  // Use scrollTo from ref and pass resetBlur
    let dragPercentPoint = targetPosition >= MAX_TRANSLATE_Y ? 100 : targetPosition <= MAX_TRANSLATE_Y ? 0 : targetPosition;
    handleDragPercentageChange(dragPercentPoint);
    // enterFade();
  };

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (isActive) {
      // exitFade();
      programmaticDrag(0);
      handleDragPercentageChange(0);
    } else {
      // enterFade();
      programmaticDrag(MAX_TRANSLATE_Y);
    }
  }, []);

  // const enterFade = () => {    
  //   Animated.timing(blurBGContainerOpacity, {
  //     toValue: 1, // Show blur
  //     duration: animationDuration,
  //     useNativeDriver: true,
  //   }).start();
  // }

  // const exitFade = () => {
  //   Animated.timing(blurBGContainerOpacity, {
  //     toValue: 0, // Hide blur
  //     duration: animationDuration,
  //     useNativeDriver: true,
  //   }).start();
  // }

  const handleDragPercentageChange = (percent: number) => {
    const newIntensity = (percent / 100) * 50;
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
          <BlurView intensity={blurIntensity} style={[blurStyles.blurContainer, {opacity: 1}]} />
        </View>
        <BottomSheet ref={ref} onDragPercentageChange={handleDragPercentageChange}>
          <View style={{ flex: 1, backgroundColor: appleGreen }}>
            <Text>
              Hello
            </Text>
          </View>
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