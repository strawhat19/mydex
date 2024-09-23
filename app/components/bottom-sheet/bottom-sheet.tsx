import { Dimensions, StyleSheet, View } from 'react-native';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 150;

type BottomSheetProps = {
  item?: any;
  children?: React.ReactNode;
  onDragPercentageChange?: (percent: number) => void;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
  dragPercentage?: any;
  translateY: any;
  percent?: any;
};

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children, onDragPercentageChange, item }, ref) => {

    const percent = useSharedValue(100);
    const active = useSharedValue(false);
    const translateY = useSharedValue(0);
    const dragPercentage = useSharedValue(100);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive, translateY, dragPercentage, percent }), [
      percent,
      scrollTo,
      isActive,
      translateY,
      dragPercentage,
    ]);

    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan().onStart(() => {
      context.value = { y: translateY.value };
    }).onUpdate((event) => {
      const newY = Math.max(event.translationY + context.value.y, MAX_TRANSLATE_Y);
      translateY.value = newY;

      // Calculate drag percentage
      const percentage = Math.min(
        Math.max((Math.abs(newY) / Math.abs(MAX_TRANSLATE_Y)) * 100, 0), 
        100
      ) - 37;

      if (onDragPercentageChange) {
        runOnJS(onDragPercentageChange)(percentage * 2);
      }
    }).onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
        if (onDragPercentageChange) {
          runOnJS(onDragPercentageChange)(0);
        }
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [15, 10],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle, { backgroundColor: item != null ? item.backgroundColor : 'black', }]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 3,
  },
});

export default BottomSheet;