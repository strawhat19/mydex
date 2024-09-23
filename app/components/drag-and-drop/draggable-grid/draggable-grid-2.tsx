import './draggable-grid.scss';

import { BlurView } from "expo-blur";
import { web } from '@/shared/shared';
import { VertImageCard } from "@/common/types";
import React, { useCallback, useContext, useRef, useState } from "react";
import { defaultVertImageCards } from "@/common/sample-data";
import CustomImage from "@/components/custom-image/custom-image";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { appleBlue, Text, View, borderRadius } from "@/components/Themed";
// import { interpolate, useAnimatedProps } from 'react-native-reanimated';
import { Animated, FlatList, TouchableOpacity, Vibration, TouchableWithoutFeedback, StyleSheet, Dimensions } from "react-native";
import BottomSheet, { BottomSheetRefProps } from '../../bottom-sheet/bottom-sheet';
import { state } from '@/shared/state';
// import { useAnimatedStyle } from 'react-native-reanimated';

export const animationDuration = 300;
export const cardImageWidth = web() ? `25%` : `33%`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 150;

export default function DraggableGrid() {
    let { indx, setIndx, blur, setBlur, selected, setSelected, } = useContext<any>(state);
    // const [snapPoints] = useState([`1%`, `65%`]);
    const [items] = useState<VertImageCard[]>(defaultVertImageCards);

    const bottomSheetRef = useRef<BottomSheetRefProps>(null);

    // const gesture = Gesture.Pan().onUpdate(e => {
    //     setY(e.translationY);
    // })

    // const sheetY = useAnimatedStyle(() => ({ transform: [{ translateY: y }] }));

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const blurBGContainerOpacity = useRef(new Animated.Value(0)).current; // Animated value for blur opacity

    // const bottomSheetRef = useRef<BottomSheet>(null);
    // const animatedPosition = useRef(new Animated.Value(0)).current; // Initialize with starting position of the bottom sheet

    // Create an interpolated value for blur intensity
    // const blurIntensity = animatedPosition.interpolate({
    //     inputRange: [0, 300],  // Replace 300 with the height of your bottom sheet when fully open
    //     outputRange: [0, 100]  // Range of blur intensity
    // });

    // const bottomSheetBGBlurItensity = useAnimatedProps([
    //     intensity: interpolate(bottomSheetRef.current.)
    // ])

    const onDragEndTouch = (item: any) => {
        openBottomSheet(item);
    }

    // const onPress = useCallback(() => {
    //     const isActive = bottomSheetRef?.current?.isActive();
    //     if (isActive && indx != 0) {
    //         closeBottomSheet();
    //     } else {
    //       bottomSheetRef?.current?.scrollTo(-200);
    //     }
    // }, []);

    const openBottomSheet = (item?: any) => {
        bottomSheetRef?.current?.scrollTo(MAX_TRANSLATE_Y);
        enterFade();
        setIndx(1);
        setSelected(item);
        Vibration.vibrate(1);
    }

    const closeBottomSheet = () => {
        setIndx(0);
        exitFade();
        setSelected(null);
        bottomSheetRef?.current?.scrollTo(0);
    }

    // const blurIntensity = bottomSheetPosition.interpolate({
    //     inputRange: [0, 1],  // Assuming 0 is fully closed and 1 is fully open
    //     outputRange: [0, 100]  // Corresponding blur intensity values
    // });      

    // Animate the opacity of the blur when opening the bottom sheet
    const enterFade = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.25,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
        
        Animated.timing(blurBGContainerOpacity, {
            toValue: 1, // Show blur
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }

    // Animate the opacity of the blur when closing the bottom sheet
    const exitFade = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();

        Animated.timing(blurBGContainerOpacity, {
            toValue: 0, // Hide blur
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }

    const DraggableItems = () => {
        return (
            <View id={`draggableItemsListContainer`} style={{ flex: 1, width: '100%', position: 'relative' }}>
                {/* The FlatList content */}
                <FlatList
                    data={items}
                    id={`draggableItemsList`}
                    style={{ flex: 1, width: `100%` }}
                    contentContainerStyle={styles.wrapper}
                    keyExtractor={(item: VertImageCard) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Animated.View 
                            id={`card`} 
                            style={{ backgroundColor: appleBlue, borderRadius, opacity: fadeAnim }}
                        >
                            <TouchableOpacity 
                                activeOpacity={0.5}
                                disabled={indx != 0} 
                                onPress={() =>  onDragEndTouch(item)}
                            >
                                <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
                                    <View style={styles.cardImageContainer}>
                                        <CustomImage alt={item.name} source={{ uri: item.image }} style={styles.cardImage} />
                                    </View>
                                    <View style={styles.cardRight}>
                                        <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>{item.name}</Text>
                                        <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>{item.description}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                />
                {/* Animated BlurView */}
                <Animated.View id={`blurBGContainer`} style={[styles.absolute, { opacity: blurBGContainerOpacity, pointerEvents: `none`, ...(web() && { backgroundColor: `rgba(0, 0, 0, 0.4)` }) }]}>
                    {web() ? <></> : <BlurView id={`blurBG`} intensity={bottomSheetRef?.current?.percent} tint={`dark`} style={styles.absolute} />}
                </Animated.View>
            </View>
        )
    }

    const SheetContent = () => {
        return (
            selected != null ? (
                <Animated.View id={`sheetCard`} style={{ ...styles.card, height: web() ? 500 : 280, width: `100%`, backgroundColor: selected.backgroundColor }}>
                    <View 
                        style={{ 
                            ...styles.cardImageContainer, 
                            ...(web() ? {width: `50%`, alignItems: `center`} : {width: `50%`}) 
                        }}
                    >
                        <CustomImage 
                            alt={selected.name} 
                            source={{ uri: selected.image }} 
                            style={{ 
                                ...cardedBorderRight,
                                ...styles.cardImage, 
                                ...(web() && {width: `fit-content`}),
                            }} 
                        />
                    </View>
                    <View style={{ ...styles.cardRight }}>
                        <Text style={{ ...styles.cardTitle, ...selected.fontColor && ({color: selected.fontColor}) }}>
                            {selected.name}
                        </Text>
                        <Text style={{ ...styles.cardDescription, ...selected.fontColor && ({color: selected.fontColor}) }}>
                            {selected.description}
                        </Text>
                    </View>
                </Animated.View>
            ) : <></>
        )
    }

    return (
        <View style={{ flex: 1, width: `100%` }}>
            {items && items.length > 0 ? (
                <>
                    {web() ? (
                        <div style={{ flex: 1, width: `100%`, overflowY: `auto`, overflowX: `hidden` }} onClick={closeBottomSheet}>
                            {DraggableItems()}
                        </div>
                    ) : (
                        <TouchableWithoutFeedback style={{ flex: 1, width: `100%` }} onPress={closeBottomSheet}>
                            {DraggableItems()}
                        </TouchableWithoutFeedback>
                    )}

                    {/* Bottom Sheet */}
                    <BottomSheet ref={bottomSheetRef} item={selected}>
                        <View style={{ flex: 1, backgroundColor: selected != null ? selected.backgroundColor : `black` }}>
                            {SheetContent()}
                        </View>
                    </BottomSheet>
                </>
            ) : <></>}
        </View>
    )
}

const cardedBorder = {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
}

const cardedBorderRight = {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
}

const styles = StyleSheet.create({
    card: {
        gap: 15,
        padding: 0,
        display: 'flex',
        borderRadius,
        overflow: `hidden`,
        flexDirection: `row`,
        alignItems: 'center',
        backgroundColor: appleBlue,
        justifyContent: 'flex-start',
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    handleStyle: {
        width: 75,
        height: 4,
        borderRadius: 3,
        backgroundColor: 'black',
    },
    bottomSheetBackground: {
        backgroundColor: 'black',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    wrapper: {
        gap: 15,
        padding: 16,
    },
    cardImageContainer: {
        margin: 0,
        width: cardImageWidth,
        backgroundColor: `transparent`,
    },
    cardRight: {
        gap: 15,
        flex: 1,
        paddingTop: 30,
        display: `flex`,
        paddingBottom: 30,
        flexDirection: `column`,
        backgroundColor: `transparent`,
    },
    cardTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    cardDescription: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        display: `flex`,
        maxWidth: `95%`,
        flexWrap: `wrap`,
    },
    cardImage: {
        flex: 1,
        margin: 0,
        ...cardedBorder,
        ...(web() && {
            maxHeight: 500,
            maxWidth: `auto`,
        })
    },
});