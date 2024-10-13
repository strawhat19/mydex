import './draggable-grid.scss';

import { BlurView } from 'expo-blur';
import { web } from '@/shared/shared';
import { VertImageCard } from '@/common/types';
import React, { useRef, useState } from 'react';
// import Draggable from './draggable/draggable';
import { useSharedValue } from 'react-native-reanimated';
// import { useSharedValue } from 'react-native-reanimated';
import { defaultVertImageCards } from '@/common/sample-data';
import { Pagination } from 'react-native-reanimated-carousel';
// import { useAnimatedStyle } from 'react-native-reanimated';
import CustomImage from '@/components/custom-image/custom-image';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { appleBlue, Text, View, borderRadius } from '@/components/Themed';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Animated, FlatList, TouchableOpacity, Vibration, TouchableWithoutFeedback, StyleSheet, useWindowDimensions } from 'react-native';

export const animationDuration = 300;
export const cardImageWidth = web() ? `25%` : `33%`;

export default function DraggableGrid() {
    const [blur,] = useState<any>(100);
    const [indx, setIndx] = useState(0);
    const progress = useSharedValue<number>(0);
    const [snapPoints] = useState([`1%`, `85%`]);
    const { width, height } = useWindowDimensions();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const scrollOffsetValue = useSharedValue<number>(0);
    const carouselRef = useRef<ICarouselInstance>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [items] = useState<VertImageCard[]>(defaultVertImageCards);
    const [selected, setSelected] = useState<VertImageCard | null>(null);
    const blurBGContainerOpacity = useRef(new Animated.Value(0)).current;
    const [carouselData, setCarouselData] = useState([{ id: `listColumn-1-random` }, { id: `listColumn-2-items` }]);

    const openItemDetail = (item: any) => {
        openBottomSheet(item);
    }

    const onSheetChange = (index?: any) => {
        if (index === 0) closeBottomSheet();
    }

    const openBottomSheet = (item?: any) => {
        enterFadeBlur();
        setIndx(1);
        setSelected(item);
        Vibration.vibrate(1);
    }

    const closeBottomSheet = () => {
        setIndx(0);
        exitFadeBlur();
        setSelected(null);
    }   

    const enterFadeBlur = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.25,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
        
        Animated.timing(blurBGContainerOpacity, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }

    const exitFadeBlur = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();

        Animated.timing(blurBGContainerOpacity, {
            toValue: 0,
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
                        // <Draggable id={item.id - 1} positions={positions}>
                            <Animated.View 
                                id={`card-${item.id}`} 
                                style={{ backgroundColor: appleBlue, borderRadius, opacity: fadeAnim }}
                            >
                                <TouchableOpacity 
                                    activeOpacity={0.5}
                                    disabled={indx != 0} 
                                    onLongPress={() => openItemDetail(item)}
                                >
                                    <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
                                        <View style={styles.cardImageContainer}>
                                            <CustomImage alt={item.name} source={{ uri: item.image }} style={styles.cardImage} />
                                        </View>
                                        <View style={styles.cardRight}>
                                            <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        // </Draggable>
                    )}
                />
                {/* Animated BlurView */}
                <Animated.View 
                    id={`blurBGContainer`} 
                    style={[
                        styles.absolute, 
                        { 
                            pointerEvents: `none`, 
                            opacity: blurBGContainerOpacity, 
                            ...(web() && { backgroundColor: `rgba(0, 0, 0, 0.4)` }), 
                        },
                    ]}
                >
                    {web() ? <></> : <BlurView id={`blurBG`} intensity={blur} tint={`dark`} style={styles.absolute} />}
                </Animated.View>
            </View>
        )
    }

    const SheetContent = () => {
        return (
            selected != null ? (
                <Animated.View 
                    id={`sheetCard`} 
                    style={{ ...styles.card, height: web() ? 500 : 280, width: `100%`, backgroundColor: selected.backgroundColor }}
                >
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

    const ListColumn = () => <>
        {web() ? (
            <div style={{ flex: 1, width: `100%`, overflowY: `auto`, overflowX: `hidden` }} onClick={closeBottomSheet}>
                {DraggableItems()}
            </div>
        ) : (
            <TouchableWithoutFeedback style={{ flex: 1, width: `100%` }} onPress={closeBottomSheet}>
                {DraggableItems()}
            </TouchableWithoutFeedback>
        )}
    </>

    const onPressPagination = (index: number) => {
        carouselRef.current?.scrollTo({
          count: index - progress.value,
          animated: true,
        });
    };

    return (
        <View style={{ flex: 1, width: `100%` }}>
            {items && items.length > 0 ? (
                <>
                    {/* <View id={`listColumn-1`} style={{ flex: 1, width: `100%` }}> */}
                        {/* <Text id={`listColumn-1-title`} style={{ textAlign: `center`, ...styles.cardTitle }}>
                            Random
                        </Text> */}
                        <Carousel
                            loop={false}
                            width={width}
                            ref={carouselRef}
                            data={carouselData}
                            pagingEnabled={true}
                            height={height - 160}
                            onProgressChange={progress}
                            defaultScrollOffsetValue={scrollOffsetValue}
                            renderItem={({ index, item }: any) => (
                                <>
                                  {ListColumn()}
                                </>
                            )}
                        />
                    {/* </View> */}

                    <Pagination.Basic
                        size={8}
                        data={carouselData}
                        progress={progress}
                        onPress={onPressPagination}
                        activeDotStyle={{ backgroundColor: '#fff' }}
                        containerStyle={{ gap: 10, marginVertical: 10 }}
                        dotStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 40 }}
                    />

                    {/* Bottom Sheet */}
                    <BottomSheet
                        index={indx}
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}
                        onChange={onSheetChange}
                        onClose={closeBottomSheet}
                        enableHandlePanningGesture={!web()}
                        enableContentPanningGesture={!web()}
                        // animatedPosition={bottomSheetPosition as any}
                        handleIndicatorStyle={styles.handleStyle} // Hide handle on web
                        enablePanDownToClose={true} // Only enable drag to close on mobile
                        backgroundStyle={{ ...styles.bottomSheetBackground, ...(selected != null && {backgroundColor: selected.backgroundColor}) }}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            {/* <GestureDetector gesture={gesture}> */}
                                {/* <Animated.View> */}
                                    {SheetContent()}
                                {/* </Animated.View> */}
                            {/* </GestureDetector> */}
                        </BottomSheetView>
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