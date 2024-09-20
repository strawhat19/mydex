import React, { useRef, useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Animated, FlatList, TouchableOpacity, Vibration, TouchableWithoutFeedback, Platform, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { VertImageCard } from "@/common/types";
import { appleBlue, Text, View } from "@/components/Themed";
import { defaultVertImageCards } from "@/common/sample-data";
import CustomImage from "@/components/custom-image/custom-image";
import './draggable-grid.scss';

export default function DraggableGrid() {
    const [indx, setIndx] = useState(0);
    const [snapPoints] = useState([`1%`, `65%`]);
    const [items] = useState<VertImageCard[]>(defaultVertImageCards);
    const [selected, setSelected] = useState<VertImageCard | null>(null);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const blurOpacity = useRef(new Animated.Value(0)).current; // Animated value for blur opacity

    const onDragEndTouch = (item: any) => {
        openBottomSheet(item);
    }

    const onSheetChange = (e?: any) => {
        if (e === 0) closeBottomSheet();
    }

    const openBottomSheet = (item?: any) => {
        enterFade();
        setIndx(1);
        setSelected(item);
        Vibration.vibrate(1);
    }

    const closeBottomSheet = () => {
        setIndx(0);
        exitFade();
        setSelected(null);
    }

    // Animate the opacity of the blur when opening the bottom sheet
    const enterFade = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.25,
            duration: 200,
            useNativeDriver: true,
        }).start();
        
        Animated.timing(blurOpacity, {
            toValue: 1, // Show blur
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    // Animate the opacity of the blur when closing the bottom sheet
    const exitFade = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

        Animated.timing(blurOpacity, {
            toValue: 0, // Hide blur
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    return (
        <View style={{ flex: 1, width: `100%` }}>
            {items && items.length > 0 ? (
                <>
                    <TouchableWithoutFeedback style={{ flex: 1, width: `100%` }} onPress={closeBottomSheet}>
                        <View style={{ flex: 1, width: '100%', position: 'relative' }}>
                            {/* The FlatList content */}
                            <FlatList
                                data={items}
                                style={{ flex: 1, width: `100%` }}
                                contentContainerStyle={styles.wrapper}
                                keyExtractor={(item: VertImageCard) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <Animated.View 
                                        id={`card`} 
                                        style={{ backgroundColor: appleBlue, borderRadius: 12, opacity: fadeAnim }}
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
                            <Animated.View style={[styles.absolute, { opacity: blurOpacity, pointerEvents: `none` }]}>
                                <BlurView intensity={100} tint="dark" style={styles.absolute} />
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Bottom Sheet */}
                    <BottomSheet
                        index={indx}
                        snapPoints={snapPoints}
                        onChange={onSheetChange}
                        onClose={closeBottomSheet}
                        enablePanDownToClose={true}
                        handleIndicatorStyle={styles.handleStyle}
                        backgroundStyle={{ ...styles.bottomSheetBackground, ...(selected != null && {backgroundColor: selected.backgroundColor}) }}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            {selected != null ? (
                                <View id={`sheetCard`} style={{ ...styles.card, height: Platform.OS == `web` ? 500 : 280, width: `100%`, backgroundColor: selected.backgroundColor }}>
                                    <View 
                                        style={{ 
                                            ...styles.cardImageContainer, 
                                            ...(Platform.OS == `web` ? {width: `30%`, alignItems: `center`} : {width: `45%`}) 
                                        }}
                                    >
                                        <CustomImage alt={selected.name} source={{ uri: selected.image }} style={{ ...styles.cardImage, ...(Platform.OS == `web` && {width: `fit-content`}) }} />
                                    </View>
                                    <View style={{ ...styles.cardRight }}>
                                        <Text style={{ ...styles.cardTitle, ...selected.fontColor && ({color: selected.fontColor}) }}>
                                            {selected.name}
                                        </Text>
                                        <Text style={{ ...styles.cardDescription, ...selected.fontColor && ({color: selected.fontColor}) }}>
                                            {selected.description}
                                        </Text>
                                    </View>
                                </View>
                            ) : <></>}
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
        backgroundColor: 'white',
        width: 75,
        height: 3,
        borderRadius: 3,
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
        width: `33%`,
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
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        ...(Platform.OS == `web` && {
            maxHeight: 500,
            maxWidth: `auto`,
        })
    },
});


// import React from 'react';

// import './draggable-grid.scss';

// import { BlurView } from "expo-blur";
// import { useRef, useState } from "react";
// import { VertImageCard } from '@/common/types';
// import { appleBlue, Text, View } from "@/components/Themed"; 
// import { defaultVertImageCards } from "@/common/sample-data";
// import CustomImage from "@/components/custom-image/custom-image";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import { Animated, FlatList, StyleSheet, TouchableOpacity, Vibration, Platform, TouchableWithoutFeedback } from "react-native"; 

// export default function DraggableGrid() {
//     let [indx, setIndx] = useState(0);
//     let [snapPoints] = useState([`1%`, `65%`]);
//     let [items] = useState<VertImageCard[]>(defaultVertImageCards);
//     let [selected, setSelected] = useState<VertImageCard | null>(null);

//     const fadeAnim = useRef(new Animated.Value(1)).current;
//     const blurAnim = useRef(new Animated.Value(0)).current; // Add an Animated value for the blur intensity

//     const onDragEndTouch = (item: any) => {
//         openBottomSheet(item);
//     }

//     const onSheetChange = (e?: any) => {
//         if (e == 0) closeBottomSheet();
//     }

//     const openBottomSheet = (item?: any) => {
//         enterFade();
//         setIndx(1);
//         setSelected(item);
//         Vibration.vibrate(1);
//     }

//     const closeBottomSheet = () => {
//         setIndx(0);
//         exitFade();
//         setSelected(null);
//     }

//     const enterFade = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 0.25,
//             duration: 200,
//             useNativeDriver: true,
//         }).start();
        
//         // Animate the blur intensity to 100 when opening
//         Animated.timing(blurAnim, {
//             toValue: 100,
//             duration: 300,
//             useNativeDriver: false, // BlurView doesn't support native driver
//         }).start();
//     }

//     const exitFade = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 200,
//             useNativeDriver: true,
//         }).start();

//         // Animate the blur intensity back to 0 when closing
//         Animated.timing(blurAnim, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//         }).start();
//     }

//     return (
//         <View style={{ flex: 1, width: `100%` }}>
//             {items && items.length > 0 ? (
//                 <>
//                     <TouchableWithoutFeedback style={{ flex: 1, width: `100%` }} onPress={closeBottomSheet}>
//                         {/* Apply the animated blur intensity */}
//                         <Animated.View style={styles.absolute}>
//                             <BlurView intensity={blurAnim as any} tint="dark" style={styles.absolute}>
//                                 <FlatList
//                                     data={items}
//                                     style={{ flex: 1, width: `100%` }}
//                                     contentContainerStyle={styles.wrapper}
//                                     keyExtractor={(item: VertImageCard) => item.id.toString()}
//                                     renderItem={({ item }) => (
//                                         <Animated.View 
//                                             id={`card`} 
//                                             style={{ backgroundColor: appleBlue, borderRadius: 12, opacity: fadeAnim }}
//                                         >
//                                             <TouchableOpacity 
//                                                 activeOpacity={0.5}
//                                                 disabled={indx != 0} 
//                                                 onPress={() =>  onDragEndTouch(item)}
//                                             >
//                                                 <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
//                                                     <View style={styles.cardImageContainer}>
//                                                         <CustomImage alt={item.name} source={{ uri: item.image }} style={styles.cardImage} />
//                                                     </View>
//                                                     <View style={styles.cardRight}>
//                                                         <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>{item.name}</Text>
//                                                         <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>{item.description}</Text>
//                                                     </View>
//                                                 </View>
//                                             </TouchableOpacity>
//                                         </Animated.View>
//                                     )}
//                                 />
//                             </BlurView>
//                         </Animated.View>
//                     </TouchableWithoutFeedback>
//                     <BottomSheet
//                         index={indx}
//                         snapPoints={snapPoints}
//                         onChange={onSheetChange}
//                         onClose={closeBottomSheet}
//                         enablePanDownToClose={true}
//                         handleIndicatorStyle={styles.handleStyle}
//                         backgroundStyle={{ ...styles.bottomSheetBackground, ...(selected != null && { backgroundColor: selected.backgroundColor }) }}
//                     >
//                         <BlurView intensity={100} tint={`dark`} style={styles.absolute}>
//                             <BottomSheetView style={styles.contentContainer}>
//                                 {selected != null ? (
//                                     <>
//                                     <View id={`sheetCard`} style={{ ...styles.card, height: Platform.OS == `web` ? 500 : 280, width: `100%`, backgroundColor: selected.backgroundColor }}>
//                                             <View 
//                                                 style={{ 
//                                                     ...styles.cardImageContainer, 
//                                                     ...(Platform.OS == `web` ? {width: `30%`, alignItems: `center`} : {width: `45%`}) 
//                                                 }}
//                                             >
//                                                 <CustomImage alt={selected.name} source={{ uri: selected.image }} style={{ ...styles.cardImage, ...(Platform.OS == `web` && {width: `fit-content`}) }} />
//                                             </View>
//                                             <View style={{ ...styles.cardRight }}>
//                                                 <Text style={{ ...styles.cardTitle, ...selected.fontColor && ({color: selected.fontColor}) }}>
//                                                     {selected.name}
//                                                 </Text>
//                                                 <Text style={{ ...styles.cardDescription, ...selected.fontColor && ({color: selected.fontColor}) }}>
//                                                     {selected.description}
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                     </>
//                                 ) : <></>}
//                             </BottomSheetView>
//                         </BlurView>
//                     </BottomSheet>
//                 </>
//             ) : <></>}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     absolute: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         flex: 1,
//     },
//     card: {
//         gap: 15,
//         padding: 0,
//         display: 'flex',
//         borderRadius: 10,
//         overflow: `hidden`,
//         flexDirection: `row`,
//         alignItems: 'center',
//         backgroundColor: appleBlue,
//         justifyContent: 'flex-start',
//     },
//     handleStyle: {
//         backgroundColor: 'white',
//         width: 75,
//         height: 3,
//         borderRadius: 3,
//     },
//     bottomSheetBackground: {
//         backgroundColor: 'black',
//     },
//     contentContainer: {
//         flex: 1,
//         paddingTop: 15,
//         paddingLeft: 15,
//         paddingRight: 15,
//         alignItems: 'center',
//     },
//     wrapper: {
//         gap: 15,
//         padding: 16,
//     },
//     cardImageContainer: {
//         margin: 0,
//         width: `33%`,
//         backgroundColor: `transparent`,
//     },
//     cardRight: {
//         gap: 15,
//         flex: 1,
//         paddingTop: 30,
//         display: `flex`,
//         paddingBottom: 30,
//         flexDirection: `column`,
//         backgroundColor: `transparent`,
//     },
//     cardTitle: {
//         fontSize: 20,
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     cardDescription: {
//         flex: 1,
//         fontSize: 16,
//         color: 'white',
//         display: `flex`,
//         maxWidth: `95%`,
//         flexWrap: `wrap`,
//     },
//     cardImage: {
//         flex: 1,
//         margin: 0,
//         borderTopLeftRadius: 10,
//         borderBottomLeftRadius: 10,
//         ...(Platform.OS == `web` && {
//             maxHeight: 500,
//             maxWidth: `auto`,
//         })
//     },
// });

// // export default function DraggableGrid() {
// //     let [indx, setIndx] = useState(0);
// //     let [snapPoints, ] = useState([`1%`, `65%`]);
// //     let [items, ] = useState<VertImageCard[]>(defaultVertImageCards);
// //     let [selected, setSelected] = useState<VertImageCard | null>(null);

// //     const fadeAnim = useRef(new Animated.Value(1)).current;

// //     const onDragEndTouch = (item: any) => {
// //         openBottomSheet(item);
// //     }

// //     const onSheetChange = (e?: any) => {
// //         if (e == 0) closeBottomSheet();
// //     }
    
// //     const openBottomSheet = (item?: any) => {
// //         enterFade();
// //         setIndx(1);
// //         setSelected(item);
// //         Vibration.vibrate(1);
// //     }

// //     const closeBottomSheet = () => {
// //         setIndx(0);
// //         exitFade();
// //         setSelected(null);
// //     }

// //     const enterFade = () => {
// //         Animated.timing(fadeAnim, {
// //           toValue: 0.25,
// //           duration: 200,
// //           useNativeDriver: true,
// //         }).start();
// //     }
    
// //     const exitFade = () => {
// //         Animated.timing(fadeAnim, {
// //           toValue: 1,
// //           duration: 200,
// //           useNativeDriver: true,
// //         }).start();
// //     }

// //     return (
// //         <View style={{ flex: 1, width: `100%` }}>
// //             {items && items.length > 0 ? (
// //                 <>
// //                     <TouchableWithoutFeedback style={{ flex: 1, width: `100%` }} onPress={closeBottomSheet}>
// //                         <BlurView intensity={indx != 1 ? 0 : 100} tint={`dark`} style={styles.absolute}>
// //                             <FlatList
// //                                 data={items}
// //                                 style={{ flex: 1, width: `100%` }}
// //                                 contentContainerStyle={styles.wrapper}
// //                                 keyExtractor={(item: VertImageCard) => item.id.toString()}
// //                                 renderItem={({ item }) => (
// //                                     <Animated.View 
// //                                         id={`card`} 
// //                                         style={{ backgroundColor: appleBlue, borderRadius: 12, opacity: fadeAnim }}
// //                                     >
// //                                         <TouchableOpacity 
// //                                             activeOpacity={0.5}
// //                                             disabled={indx != 0} 
// //                                             onPress={() =>  onDragEndTouch(item)}
// //                                         >
// //                                             <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
// //                                                 <View style={styles.cardImageContainer}>
// //                                                     <CustomImage alt={item.name} source={{ uri: item.image }} style={styles.cardImage} />
// //                                                 </View>
// //                                                 <View style={styles.cardRight}>
// //                                                     <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>{item.name}</Text>
// //                                                     <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>{item.description}</Text>
// //                                                 </View>
// //                                             </View>
// //                                         </TouchableOpacity>
// //                                     </Animated.View>
// //                                 )}
// //                             />
// //                         </BlurView>
// //                     </TouchableWithoutFeedback>
// //                     <BottomSheet
// //                         index={indx}
// //                         snapPoints={snapPoints}
// //                         onChange={onSheetChange}
// //                         onClose={closeBottomSheet}
// //                         enablePanDownToClose={true}
// //                         handleIndicatorStyle={styles.handleStyle}
// //                         backgroundStyle={{ ...styles.bottomSheetBackground, ...(selected != null && {backgroundColor: selected.backgroundColor}) }}
// //                     >
// //                         <BlurView intensity={100} tint={`dark`} style={styles.absolute}>
// //                             <BottomSheetView style={styles.contentContainer}>
// //                                 {selected != null ? (
// //                                     <>
// //                                     <View id={`sheetCard`} style={{ ...styles.card, height: Platform.OS == `web` ? 500 : 280, width: `100%`, backgroundColor: selected.backgroundColor }}>
// //                                             <View 
// //                                                 style={{ 
// //                                                     ...styles.cardImageContainer, 
// //                                                     ...(Platform.OS == `web` ? {width: `30%`, alignItems: `center`} : {width: `45%`}) 
// //                                                 }}
// //                                             >
// //                                                 <CustomImage alt={selected.name} source={{ uri: selected.image }} style={{ ...styles.cardImage, ...(Platform.OS == `web` && {width: `fit-content`}) }} />
// //                                             </View>
// //                                             <View style={{ ...styles.cardRight }}>
// //                                                 <Text style={{ ...styles.cardTitle, ...selected.fontColor && ({color: selected.fontColor}) }}>
// //                                                     {selected.name}
// //                                                 </Text>
// //                                                 <Text style={{ ...styles.cardDescription, ...selected.fontColor && ({color: selected.fontColor}) }}>
// //                                                     {selected.description}
// //                                                 </Text>
// //                                             </View>
// //                                         </View>
// //                                     </>
// //                                 ) : <></>}
// //                             </BottomSheetView>
// //                         </BlurView>
// //                     </BottomSheet>
// //                 </>
// //             ) : <></>}
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     card: {
// //         gap: 15,
// //         padding: 0,
// //         display: 'flex',
// //         borderRadius: 10,
// //         overflow: `hidden`,
// //         flexDirection: `row`,
// //         alignItems: 'center',
// //         backgroundColor: appleBlue,
// //         justifyContent: 'flex-start',
// //     },
// //     absolute: {
// //         position: 'absolute',
// //         width: '100%',
// //         height: '100%',
// //         flex: 1,
// //     },
// //     textStyle: {
// //         color: '#ffffff',
// //         fontSize: 18,
// //     },
// //     handleStyle: {
// //         backgroundColor: 'white',
// //         width: 75,
// //         height: 3,
// //         borderRadius: 3,
// //     },
// //     sheet: {
// //         flex: 1,
// //         padding: 24,
// //         backgroundColor: 'grey',
// //     },
// //     contentContainer: {
// //         flex: 1,
// //         paddingTop: 15,
// //         paddingLeft: 15,
// //         paddingRight: 15,
// //         alignItems: 'center',
// //     },
// //     cardImageContainer: {
// //         margin: 0,
// //         width: `33%`,
// //         backgroundColor: `transparent`,
// //     },
// //     container: {
// //         flex: 1,
// //         backgroundColor: 'black',
// //     },
// //     wrapper: {
// //         gap: 15,
// //         padding: 16,
// //     },
// //     cardTitle: {
// //         fontSize: 20,
// //         color: 'white',
// //         fontWeight: 'bold',
// //     },
// //     cardRight: {
// //         gap: 15,
// //         flex: 1,
// //         paddingTop: 30,
// //         display: `flex`,
// //         paddingBottom: 30,
// //         flexDirection: `column`,
// //         backgroundColor: `transparent`,
// //     },
// //     cardDescription: {
// //         flex: 1,
// //         fontSize: 16,
// //         color: 'white',
// //         display: `flex`,
// //         maxWidth: `95%`,
// //         flexWrap: `wrap`,
// //     },
// //     cardImage: {
// //         flex: 1,
// //         margin: 0,
// //         borderTopLeftRadius: 10,
// //         borderBottomLeftRadius: 10,
// //         ...(Platform.OS == `web` && {
// //             maxHeight: 500,
// //             maxWidth: `auto`,
// //         })
// //     },
// //     bottomSheetBackground: {
// //         backgroundColor: 'black',
       
// //     },
// // });