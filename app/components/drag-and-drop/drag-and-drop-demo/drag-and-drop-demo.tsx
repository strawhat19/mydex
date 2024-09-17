import React, { useState } from 'react';
import { defaultNavyBlue } from '@/app/(tabs)/styles';
import Draggable from 'react-native-draggable';  // For mobile
import { Vibration, View, Text, Platform, StyleSheet  } from 'react-native';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable as WebDraggable } from 'react-beautiful-dnd';  // For web

export const draggableCardStyle = { margin: 10, backgroundColor: defaultNavyBlue, padding: 20, borderRadius: 10 };

const cardInitialPositions = [
  { x: 75, y: 100 },
  { x: 75, y: 200 },
  { x: 75, y: 300 }
];

export const mobileDraggableItems = () => {
  const [positions, setPositions] = useState(cardInitialPositions);

  const onDragRelease = (index: any, nativeEvent: any) => {
    const overlap = positions.some((pos, posIndex) => {
      if (index !== posIndex) {
        return Math.abs(pos.y - nativeEvent.pageY) < 50;  // Adjust 50 to your acceptable overlap distance
      }
      return false;
    });

    if (overlap) {
      Vibration.vibrate(10);  // Vibrate on overlap
    }

    // Reset position to ensure cards stay stacked
    setPositions([...cardInitialPositions]);
  };

  return (
    <View style={styles.container}>
      {positions.map((position, index) => (
        <Draggable
          key={index}
          x={position.x}
          y={position.y}
          onDragRelease={(event) => onDragRelease(index, event.nativeEvent)}
          onPressIn={() => Vibration.vibrate(10)}  // Vibrate when pressing to drag
        >
          <View style={styles.card}>
            <Text style={styles.text}>Draggable Item {index + 1} (Mobile)</Text>
          </View>
        </Draggable>
      ))}
    </View>
  );
};

export const webDraggableItems = () => {
  return (
    <DragDropContext onDragEnd={(result) => console.log(`DragDropContext Result`, result)}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <WebDraggable draggableId="1" index={1}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div style={draggableCardStyle}><Text style={{ color: `white` }}>Draggable Item (Web)</Text></div>
                  </div>
                )}
              </WebDraggable>
              {provided.placeholder}
            </div>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <WebDraggable draggableId="2" index={2}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div style={draggableCardStyle}><Text style={{ color: `white` }}>Draggable Item (Web)</Text></div>
                  </div>
                )}
              </WebDraggable>
              {provided.placeholder}
            </div>
          </>
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
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    margin: 10,
    backgroundColor: defaultNavyBlue,
    padding: 20,
    borderRadius: 10
  },
  text: {
    color: 'white'
  }
});