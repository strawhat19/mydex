import React from 'react';

import './draggable-grid.scss';

import { BlurView } from "expo-blur";
import { useRef, useState } from "react";
import CustomImage from "@/components/custom-image/custom-image";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { appleBlue, appleGreen, applePurple, appleRed, appleYellow, Text, View } from "@/components/Themed"; 
import { Animated, FlatList, StyleSheet, TouchableOpacity, Vibration, Platform, TouchableWithoutFeedback } from "react-native"; 

export const initialCards = [
    {
      id: 1,
      name: "First One",
      fontColor: `black`,
      backgroundColor: appleGreen,
      description: "This is the first card in our draggable grid.",
      image: 'https://raw.githubusercontent.com/strawhat19/mydex/main/assets/images/hq/music.jpg',
    },
    {
      id: 2,
      name: "Second One",
      backgroundColor: appleBlue,
      description: "This is the second card in our draggable grid.",
      image: 'https://raw.githubusercontent.com/strawhat19/mydex/main/assets/images/hq/nature.jpg',
    },
    {
      id: 3,
      name: "Third One",
      backgroundColor: appleRed,
      description: "This is the third card in our draggable grid.",
      image: "https://raw.githubusercontent.com/strawhat19/mydex/main/assets/images/hq/singing.jpg",
    },
    {
      id: 4,
      name: "Fourth",
      backgroundColor: applePurple,
      description: "This is the fourth card in our draggable grid.",
      image: "https://images.pexels.com/photos/414943/pexels-photo-414943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      name: "Fifth",
      fontColor: `black`,
      backgroundColor: appleYellow,
      description: "This is the fifth card in our draggable grid.",
      image: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];

export default function DraggableGrid() {
    let [indx, setIndx] = useState(0);
    let [items, ] = useState(initialCards);
    let [snapPoints, ] = useState([`1%`, `65%`]);
    let [selected, setSelected] = useState<any>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

    const handlePressIn = () => {
        // Trigger fade-out effect
        Animated.timing(fadeAnim, {
          toValue: 0.25,
          duration: 200, // Transition duration
          useNativeDriver: true, // Optimize performance
        }).start();
    };
    
    const handlePressOut = () => {
        // Trigger fade-in effect
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200, // Transition duration
          useNativeDriver: true,
        }).start();
    };

    const onDragEndTouch = (item: any) => {
        openBottomSheet(item);
    }

    const onSheetChange = (e?: any) => {
        if (e == 0) closeBottomSheet();
    }
    
    const openBottomSheet = (item?: any) => {
        setIndx(1);
        handlePressIn();
        setSelected(item);
        Vibration.vibrate(1);
    }

    const closeBottomSheet = () => {
        setIndx(0);
        handlePressOut();
        setSelected(null);
    }

    return (
        <View style={{ flex: 1, width: `100%` }}>
            {items && items.length > 0 ? (
                <>
                    <TouchableWithoutFeedback style={{ flex: 1, width: `100%` }} onPress={closeBottomSheet}>
                        <BlurView intensity={indx != 1 ? 0 : 90} tint={`dark`} style={styles.absolute}>
                            <FlatList
                                data={items}
                                style={{ flex: 1, width: `100%` }}
                                contentContainerStyle={styles.wrapper}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                    <Animated.View 
                                        id={`card`} 
                                        style={{ backgroundColor: appleBlue, borderRadius: 12, opacity: fadeAnim }}
                                    >
                                        <TouchableOpacity 
                                            activeOpacity={0.5}
                                            disabled={indx != 0} 
                                            // onPressIn={handlePressIn}
                                            // onPressOut={handlePressOut}
                                            onPress={() =>  onDragEndTouch(item)}
                                        >
                                            {/* <BlurView intensity={100}> */}
                                            <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
                                                <View style={styles.cardImageContainer}>
                                                    <CustomImage alt={item.name} source={{ uri: item.image }} style={styles.cardImage} />
                                                </View>
                                                <View style={styles.cardRight}>
                                                    <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>{item.name}</Text>
                                                    <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>{item.description}</Text>
                                                </View>
                                            </View>
                                            {/* </BlurView> */}
                                        </TouchableOpacity>
                                    </Animated.View>
                                )}
                            />
                        </BlurView>
                    </TouchableWithoutFeedback>
                    <BottomSheet
                        index={indx}
                        // onClose={close}
                        snapPoints={snapPoints}
                        onChange={onSheetChange}
                        // enablePanDownToClose={true}
                        handleIndicatorStyle={styles.handleStyle}
                        backgroundStyle={styles.bottomSheetBackground}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            {selected != null ? (
                                <>
                                   <View style={{ ...styles.card, height: 280, backgroundColor: selected.backgroundColor }}>
                                        <View style={{ ...styles.cardImageContainer, width: `45%` }}>
                                            <CustomImage alt={selected.name} source={{ uri: selected.image }} style={styles.cardImage} />
                                        </View>
                                        <View style={{ ...styles.cardRight, maxWidth: 155 }}>
                                            <Text style={{ ...styles.cardTitle, ...selected.fontColor && ({color: selected.fontColor}) }}>
                                                {selected.name}
                                            </Text>
                                            <Text style={{ ...styles.cardDescription, ...selected.fontColor && ({color: selected.fontColor}) }}>
                                                {selected.description}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            ) : <></>}
                            <View style={styles.buttonContainer}>
                                {/* <Button title={`Close`} onPress={closeBottomSheet} /> */}
                            </View>
                        </BottomSheetView>
                    </BottomSheet>
                </>
            ) : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        gap: 15,
        padding: 0,
        display: 'flex',
        borderRadius: 10,
        flexDirection: `row`,
        alignItems: 'center',
        backgroundColor: appleBlue,
        justifyContent: 'flex-start',
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    textStyle: {
        color: '#ffffff', // White text
        fontSize: 18, // Font size for the text inside the BottomSheet
    },
    handleStyle: {
        backgroundColor: 'white', // Custom yellow color for the handle
        width: 75, // Customize handle width
        height: 3, // Customize handle height
        borderRadius: 3, // Make the handle rounded
    },
    buttonContainer: {
        gap: 15,
        marginTop: 20,
        flexDirection: 'column',
        backgroundColor: `transparent`,
        justifyContent: 'space-between',
    },
    sheet: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    cardImageContainer: {
        margin: 0,
        width: `33%`,
        backgroundColor: `transparent`,
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    wrapper: {
        gap: 15,
        padding: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    cardRight: {
        gap: 15,
        paddingTop: 30,
        display: `flex`,
        paddingBottom: 30,
        flexDirection: `column`,
        backgroundColor: `transparent`,
    },
    cardDescription: {
        fontSize: 16,
        maxWidth: 180,
        color: 'white',
        display: `flex`,
        flexWrap: `wrap`,
    },
    cardImage: {
        flex: 1,
        margin: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        ...(Platform.OS == `web` && {
            maxHeight: 500,
            maxWidth: `auto`,
        })
    },
    bottomSheetBackground: {
        backgroundColor: 'black',
        // backgroundColor: 'transparent',
    },
});