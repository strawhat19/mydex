import { BlurView } from 'expo-blur';
import { web } from '@/shared/shared';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { ListColumn, VertImageCard } from '@/common/types';
import { defaultVertImageCards } from '@/common/sample-data';
import { Pagination } from 'react-native-reanimated-carousel';
import CustomImage from '@/components/custom-image/custom-image';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { appleBlue, Text, View, borderRadius } from '@/components/Themed';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Animated, TouchableOpacity, Vibration, StyleSheet, useWindowDimensions } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

export const gridSpacing = 15;
export const animationDuration = 300;
export const paginationHeightMargin = 200;
export const cardImageWidth = web() ? `25%` : `33%`;

export default function Board() {
    const progress = useSharedValue<number>(0);
    const { width, height } = useWindowDimensions();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const scrollOffsetValue = useSharedValue<number>(0);
    const carouselRef = useRef<ICarouselInstance>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const blurBGContainerOpacity = useRef(new Animated.Value(0)).current;

    const [blur,] = useState<any>(100);
    const [indx, setIndx] = useState(0);
    const [snapPoints] = useState([`1%`, `85%`]);
    // const [isDragging, setIsDragging] = useState(false);
    const [selected, setSelected] = useState<VertImageCard | null>(null);
    const [carouselData, setCarouselData] = useState<ListColumn[]>([
        { 
            name: `Items`, 
            category: `Items`,
            id: `1-listColumn-items`,
            items: [defaultVertImageCards[0], defaultVertImageCards[1]],
        }, 
        { 
            name: `Active`, 
            category: `Active`,
            id: `2-listColumn-active`,
            items: [defaultVertImageCards[2], defaultVertImageCards[3]],
        },
        { 
            name: `Complete`, 
            category: `Complete`,
            id: `3-listColumn-complete`,
            items: [defaultVertImageCards[4], defaultVertImageCards[5], defaultVertImageCards[6]],
        },
    ]);
    
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

    const onPressPagination = (index: number) => {
        carouselRef.current?.scrollTo({
          count: index - progress.value,
          animated: true,
        });
    }

    const handleDragEnd = ({ data }: any) => {
        setCarouselData((prevCarouselData: ListColumn[]) => {
            return prevCarouselData.map((list: ListColumn) => {
                if (list.id == data[0].listID) {
                    return {
                        ...list,
                        items: data,
                    };
                } else return list;
            })
        })
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

    const DraggableItem = ({ item, drag, isActive }: RenderItemParams<VertImageCard>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={styles.rowItem}
                    onPress={() => selected != null ? closeBottomSheet() : openBottomSheet(item)}
                >
                    <Animated.View 
                        id={`card-${item?.id}`} 
                        style={{ flex: 1, width: `100%`, backgroundColor: appleBlue, borderRadius, opacity: fadeAnim }}
                    >
                        <View style={{ ...styles.card, backgroundColor: item?.backgroundColor }}>
                            <View style={styles.cardImageContainer}>
                                <CustomImage alt={item?.name} source={{ uri: item?.image }} style={styles.cardImage} />
                            </View>
                            <View style={styles.cardRight}>
                                <Text style={{ ...styles.cardTitle, ...item?.fontColor && ({color: item?.fontColor}) }}>
                                    {item?.name}
                                </Text>
                                <Text style={{ ...styles.cardDescription, ...item?.fontColor && ({color: item?.fontColor}) }}>
                                    {item?.description}
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    }

    return <>
        <Carousel
            loop={false}
            width={width}
            height={height}
            ref={carouselRef}
            data={carouselData}
            pagingEnabled={true}
            onProgressChange={progress}
            defaultScrollOffsetValue={scrollOffsetValue}
            renderItem={({ index, item }: any) => (
                <>
                    <DraggableFlatList
                        data={item?.items}
                        // key={item?.key}
                        onDragEnd={handleDragEnd}
                        renderItem={DraggableItem}
                        keyExtractor={(item) => item?.key}
                        style={{ height: height - paginationHeightMargin}}
                        onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
                        onPlaceholderIndexChange={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
                        contentContainerStyle={{ 
                            width: `100%`,
                            gap: gridSpacing - 2, 
                            padding: gridSpacing,  
                            marginHorizontal: `auto`, 
                        }}
                    />
                    <View id={`${item.id}-footer`} style={{ width: `100%`, alignItems: `center`, justifyContent: `space-between`, display: `flex`, gap: 5 }}>
                        <TouchableOpacity style={{ backgroundColor: appleBlue, width: `92%`, padding: 1, borderRadius: borderRadius - 3 }}>
                            <Text style={[styles.cardTitle, { textAlign: `center`, fontSize: 16 }]}>
                                + Add Item
                            </Text>
                        </TouchableOpacity>
                        <Text style={[styles.cardTitle, { textAlign: `center`, fontStyle: `italic`, fontSize: 16 }]}>
                            {item?.name}    
                        </Text>
                    </View>
                </>
            )}
        />

        <View style={{ flex: 1, width: `100%`, marginTop: -1 * (paginationHeightMargin - 55), pointerEvents: `none` }}>
            <Pagination.Basic
                size={8}
                data={carouselData}
                progress={progress}
                onPress={onPressPagination}
                containerStyle={{ gap: 10, }}
                activeDotStyle={{ backgroundColor: `#fff` }}
                dotStyle={{ backgroundColor: `rgba(255, 255, 255, 0.5)`, borderRadius: 40 }}
            />
        </View>

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

        <BottomSheet
            index={indx}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={onSheetChange}
            onClose={closeBottomSheet}
            // backdropComponent={backdrop}
            enableHandlePanningGesture={!web()}
            enableContentPanningGesture={!web()}
            handleIndicatorStyle={styles.handleStyle} // Hide handle on web
            enablePanDownToClose={true} // Only enable drag to close on mobile
            backgroundStyle={{ ...styles.bottomSheetBackground, ...(selected != null && {backgroundColor: selected.backgroundColor}) }}
        >
            <BottomSheetView style={styles.contentContainer}>
                {selected != null ? (
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
                ) : <></>}
            </BottomSheetView>
        </BottomSheet>
    </>
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
    rowItem: {
        width: `100%`,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        gap: 15,
        padding: 0,
        borderRadius,
        display: 'flex',
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