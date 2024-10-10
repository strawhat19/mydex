import React from 'react';
import * as Haptics from 'expo-haptics';
import { MARGIN, SIZE } from '@/common/exports';
import { useSharedValue } from 'react-native-reanimated';
import Draggable from '../draggable-grid/draggable/draggable';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appleBlue, appleGreen, appleRed, Text } from '@/components/Themed';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const colors = [appleBlue, appleRed, appleGreen];
const items = new Array(35).fill(``).map((_, i) => i);
const getBGPatternColor = (idx: number) => colors[idx % colors.length];

export default function DragNDrop() {
    const positions = useSharedValue(
        Object.assign({}, ...items.map((item, idx) => ({[item]: item}))),
    );

    const onDragEndTouch = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        {items.map((item, idx) => (
                            <TouchableOpacity 
                                key={item}    
                                activeOpacity={0.5}
                                onPress={() =>  onDragEndTouch()}
                            >
                                <Draggable id={item} positions={positions}>
                                    <View style={[styles.item, { backgroundColor: getBGPatternColor(idx) }]}>
                                        <Text style={styles.text}>{item + 1}</Text>
                                        <Text style={styles.text}>Drag</Text>
                                    </View>
                                </Draggable>
                            </TouchableOpacity>
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
      width: `100%`,
      backgroundColor: `black`,
    },
    wrapper: {
        padding: 0,
        width: `100%`,
        flexWrap: `wrap`,
        flexDirection: `row`,
    },
    item: {
        width: SIZE,
        height: SIZE,
        margin: MARGIN,
        borderRadius: 0,
        alignItems: `center`,
        justifyContent: `center`,
    },
    text: {
        fontSize: 16,
        color: `white`,
        fontWeight: `bold`,
    },
});