// import * as Haptics from 'expo-haptics';
// import { Vibration } from 'react-native';
import { MARGIN, getPosition, getOrder } from '@/common/exports';
import { PanGestureHandler } from 'react-native-gesture-handler';
// import HapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import Animated, { useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function Draggable({ children, positions, id }: any) {
  const position = getPosition(positions?.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      // console.log(`Rearranged`, newOrder);
      const newPostions = getPosition(newOrder);
      translateX.value = withTiming(newPostions.x);
      translateY.value = withTiming(newPostions.y);
    },
  );  

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (evt, ctx: any) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          key => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPostions = JSON.parse(JSON.stringify(positions.value));
          newPostions[id] = newOrder;
          newPostions[idToSwap] = oldOrder;
          positions.value = newPostions;
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          // Vibration.vibrate(1);
          // HapticFeedback.trigger(HapticFeedbackTypes.impactLight, {
          //   enableVibrateFallback: true,
          //   ignoreAndroidSystemSettings: false,
          // });
        }
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x);
      translateY.value = withTiming(destination.y);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      margin: MARGIN * 2,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}