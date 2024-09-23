import Box from './box';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Draggable from '../draggable-grid/draggable/draggable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const boxes = new Array(25).fill('').map((_, i) => i);

export default function DNDYT() {
    const positions = useSharedValue(
        Object.assign({}, ...boxes.map(item => ({[item]: item}))),
    );

    return (
        <SafeAreaProvider style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        {boxes.map(item => (
                            <Draggable key={item} positions={positions} id={item}>
                                <Box key={item} count={item} />
                            </Draggable>
                        ))}
                    </View>
                </SafeAreaView>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    wrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 16,
    },
});