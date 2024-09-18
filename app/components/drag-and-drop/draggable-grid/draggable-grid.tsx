import { useRef, useState } from "react";
import { appleBlue } from "@/app/(tabs)/styles";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, Image, StyleSheet, TouchableOpacity, Vibration, Button } from "react-native"; 
import { appleGreen, applePurple, appleRed, appleYellow, Text, View } from "@/components/Themed"; 

export const initialCards = [
    {
      id: 1,
      name: "First",
      fontColor: `black`,
      backgroundColor: appleGreen,
      description: "This is the first card in our draggable grid.",
      image: 'https://raw.githubusercontent.com/strawhat19/mydex/main/assets/images/hq/music.jpg',
    },
    {
      id: 2,
      name: "Second",
      backgroundColor: appleBlue,
      description: "This is the second card in our draggable grid.",
      image: 'https://raw.githubusercontent.com/strawhat19/mydex/main/assets/images/hq/nature.jpg',
    },
    {
      id: 3,
      name: "Third",
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
    const bottomSheetRef = useRef<BottomSheet>(null);
    let [items, ] = useState(initialCards);
    let [snapPoints, ] = useState([`1%`,`75%`]);

    const onDragEndTouch = () => {
        Vibration.vibrate(1);
        open();
    };

    const open = () => {
        if (bottomSheetRef.current) {
        //   const currentIndex: any = (bottomSheetRef.current as any)?.index;
        //   const nextIndex = (currentIndex + 1) % snapPoints.length; // Loop through snap points
          bottomSheetRef.current.snapToIndex(1);
        }
      };
    
      // Function to snap to the previous index
      const close = () => {
        if (bottomSheetRef.current) {
        //   const currentIndex: any = (bottomSheetRef.current as any)?.index;
        //   const prevIndex = (currentIndex - 1 + snapPoints.length) % snapPoints.length; // Loop backward through snap points
          bottomSheetRef.current.snapToIndex(0);
        }
      };

    return (
        <View style={{ flex: 1 }}>
            {items && items.length > 0 ? (
                <>
                    <FlatList
                        data={items}
                        contentContainerStyle={styles.wrapper}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() =>  onDragEndTouch()}>
                                <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
                                    <View style={styles.cardImageContainer}>
                                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                                    </View>
                                    <View style={styles.cardRight}>
                                        <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>{item.name}</Text>
                                        <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>{item.description}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        handleIndicatorStyle={styles.handleStyle}
                        backgroundStyle={styles.bottomSheetBackground}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <Text style={styles.textStyle}>Awesome 🎉</Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Snap to Next" onPress={open} />
                                <Button title="Snap to Previous" onPress={close} />
                            </View>
                        </BottomSheetView>
                    </BottomSheet>
                </>
            ) : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
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
    card: {
        gap: 15,
        padding: 0,
        width: '100%',
        display: 'flex',
        borderRadius: 10,
        flexDirection: `row`,
        alignItems: 'center',
        backgroundColor: appleBlue,
        justifyContent: 'flex-start',
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
    },
    bottomSheetBackground: {
        backgroundColor: 'black', // Custom navy blue color for the BottomSheet background
    },
});