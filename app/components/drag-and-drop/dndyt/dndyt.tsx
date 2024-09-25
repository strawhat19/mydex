import Box from './box';
import React, { useState } from 'react';
// import { Text } from '@/components/Themed';
import { VertImageCard } from '@/common/types';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { defaultVertImageCards } from '@/common/sample-data';
import Draggable from '../draggable-grid/draggable/draggable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appleBlue, appleGreen, appleRed } from '@/components/Themed';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const boxes = new Array(40).fill(``).map((_, i) => i);

export default function DNDYT() {
    const [items] = useState<VertImageCard[]>(defaultVertImageCards);
    const colors = [appleBlue, appleRed, appleGreen];
    const getBGPatternColor = (idx: number) => colors[idx % colors.length];

    const positions = useSharedValue(
        Object.assign({}, ...boxes.map((item, idx) => ({[item]: item}))),
    );

    return (
        <SafeAreaProvider style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        {boxes.map((item, idx) => (
                            <Draggable key={item} id={item} positions={positions}>
                                {/* <View style={{ width: `100%`, height: `100%`, backgroundColor: getBGPatternColor(idx) }}>
                                    <Text>Drag Me</Text>
                                </View> */}
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