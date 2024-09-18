import React, { useState } from 'react';
import { appleBlue, defaultNavyBlue } from '@/app/(tabs)/styles';
import Draggable from 'react-native-draggable';  // For mobile
import { Vibration, View, Text, Platform, StyleSheet, SafeAreaView  } from 'react-native';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable as WebDraggable } from 'react-beautiful-dnd';  // For web
import SortableList from '../pangesture-demo/pangesture-demo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableGrid from '../draggable-grid/draggable-grid';

export const draggableCardStyle = { margin: 10, backgroundColor: appleBlue, padding: 20, borderRadius: 10 };

const cardInitialPositions = [
  { x: 75, y: 100 },
  { x: 75, y: 200 },
  { x: 75, y: 300 }
];

export const mobileDraggableItems = () => {
  const [positions, setPositions] = useState(cardInitialPositions);

  const items = [
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2' },
    { key: '3', label: 'Item 3' },
    // Add more items as needed
  ];

  const onDragRelease = (index: any, nativeEvent: any) => {
    const overlap = positions.some((pos, posIndex) => {
      if (index !== posIndex) {
        Vibration.vibrate(1);
        return Math.abs(pos.y - nativeEvent.pageY) < 50;  // Adjust 50 to your acceptable overlap distance
      }
      return false;
    });

    // Reset position to ensure cards stay stacked
    setPositions([...cardInitialPositions]);
  };

  return (
    <SafeAreaView style={{ flex: 1, width: `100%`, justifyContent: `center`, alignItems: `center` }}>
      <DraggableGrid />
      {/* <GestureHandlerRootView style={{ flex: 1, width: `100%` }}>
        <SortableList items={items} style={{ flex: 1, width: `100%` }} />
      </GestureHandlerRootView> */}
    </SafeAreaView>
    // <View style={styles.container}>
    //   {positions.map((position, index) => (
    //     <Draggable
    //       key={index}
    //       x={position.x}
    //       y={position.y}
    //       onDragRelease={(event) => onDragRelease(index, event.nativeEvent)}
    //       onPressIn={() => Vibration.vibrate(1)}  // Vibrate when pressing to drag
    //     >
    //       <View style={styles.card}>
    //         <Text style={styles.text}>Draggable Item {index + 1} (Mobile)</Text>
    //       </View>
    //     </Draggable>
    //   ))}
    // </View>
  );
};

export const webDraggableItems = () => {
  let [webCards, setWebCards] = useState([
    {
      id: 1,
      color: `white`,
    },
    {
      id: 2,
      color: `white`,
    },
    {
      id: 3,
      color: `white`,
    },
  ]);

  return (
    <DragDropContext onDragEnd={(result) => console.log(`DragDropContext Result`, result)}>
      <Droppable droppableId={`droppable`}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div className={`draggableCardContainer webCardContContainer`}>
            {webCards.map((wc: any, idx: any) => {
              return (
                <div key={idx} className={`draggableCardWrapper webCardContWrapper`} ref={provided.innerRef} {...provided.droppableProps}>
                  <WebDraggable draggableId={wc.id.toString()} index={idx}>
                    {(provided) => (
                      <div className={`draggableCardCont webCardContCont`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className={`draggableCard webCard`} style={draggableCardStyle}>
                          <Text style={{ color: `white` }}>Draggable Item {idx + 1} (Web)</Text>
                        </div>
                      </div>
                    )}
                  </WebDraggable>
                  {provided.placeholder}
                </div>
              )
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default function DragAndDropDemo() {
  if (Platform.OS === `web`) {
    return webDraggableItems();
  } else {
    return mobileDraggableItems();
    // return MobileDraggableStack();
  }
};

const styles = StyleSheet.create({
  container: {
    width: `100%`,
    height: `100%`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    backgroundColor: appleBlue,
    padding: 20,
    borderRadius: 10
  },
  text: {
    color: 'white',
  }
});