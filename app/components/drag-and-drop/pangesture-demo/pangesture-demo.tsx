import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function SortableList({ items, style }: any) {
  const [list, setList] = useState(items);
  const dragY = useRef(new Animated.Value(0)).current;
  const draggingIndex = useRef(new Animated.Value(-1)).current;
  const onGestureEvent = Animated.event([{ nativeEvent: { translationY: dragY } }], { useNativeDriver: false });

  // Reorder function triggered when the drag ends
  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      let newIndex = Math.round(translationY / 50 + event.nativeEvent.y / 50);
      newIndex = newIndex < 0 ? 0 : newIndex >= list.length ? list.length - 1 : newIndex;
      const rearrangedList = [...list];
      const [rearrangedItem] = rearrangedList.splice(event.nativeEvent.y / 50, 1);
      rearrangedList.splice(newIndex, 0, rearrangedItem);
      setList(rearrangedList);
      draggingIndex.setValue(-1);
      dragY.setValue(0);
    }
  };

  return (
    <View style={styles.container}>
      {list.map((item: any, index: any) => {
        const translateY: any = Animated.add(
          Animated.multiply(draggingIndex, 50),
          dragY.interpolate({
            inputRange: [0, index * 50],
            outputRange: [0, index * 50],
            extrapolate: 'clamp',
          })
        );

        const zIndex = draggingIndex.interpolate({
          inputRange: [index, index],
          outputRange: [100, 100],
          extrapolate: 'clamp',
        });

        return (
          <PanGestureHandler
            key={index}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            onBegan={() => draggingIndex.setValue(index)}
          >
            <Animated.View
              style={[
                styles.card,
                {
                  ...style,
                  zIndex,
                  transform: [{ translateY: draggingIndex.interpolate({
                      inputRange: [index, index],
                      outputRange: [0, 50],
                      extrapolate: 'clamp'
                    })
                  }],
                },
              ]}
            >
              <Text style={styles.cardText}>{item && item.label ? item.label : `Item`}</Text>
            </Animated.View>
          </PanGestureHandler>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  card: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    margin: 5,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
  },
});