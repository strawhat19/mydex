import { useState } from "react";
import { appleBlue } from "@/app/(tabs)/styles";
import { images, Text, View } from "@/components/Themed"; 
import { FlatList, Image, StyleSheet } from "react-native"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const initialCards = [
    {
      id: 1,
      name: "First",
      image: '../../../assets/images/hq/music.jpg',
      description: "This is the first card in our draggable grid."
    },
    {
      id: 2,
      name: "Second",
      image: 'assets/images/hq/nature.jpg',
      description: "This is the second card in our draggable grid."
    },
    {
      id: 3,
      name: "Third",
      image: "https://images.pexels.com/photos/949274/pexels-photo-949274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "This is the third card in our draggable grid."
    },
];

export default function DraggableGrid() {
    let [items, setItems] = useState(initialCards);

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.container}>
                {items && items.length > 0 ? (
                    <FlatList
                        data={items}
                        contentContainerStyle={styles.wrapper}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.cardImage} width={100} height={140} />
                                <View style={styles.cardRight}>
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text style={styles.cardDescription}>{item.description}</Text>
                                </View>
                            </View>
                        )}
                    />
                ) : <></>}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    wrapper: {
        gap: 15,
        padding: 16,
    },
    card: {
        padding: 15,
        width: '100%',
        minHeight: 75,
        display: 'flex',
        borderRadius: 10,
        flexDirection: `row`,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: appleBlue,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    cardRight: {
        gap: 15,
        display: `flex`,
        flexDirection: `column`,
        backgroundColor: `transparent`,
    },
    cardDescription: {
        fontSize: 16,
        color: 'white',
        maxWidth: `90%`,
        display: `flex`,
        flexWrap: `wrap`,
    },
    cardImage: {
        marginBottom: 10,
        // width: 200, // Adjust the size according to your layout
        // minWidth: 200, // Adjust the size according to your layout
        // maxWidth: 200, // Adjust the size according to your layout
    },
});