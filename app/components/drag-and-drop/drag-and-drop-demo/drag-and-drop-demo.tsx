import React from 'react';
import { View, Text, Platform } from 'react-native';
import Draggable from 'react-native-draggable';  // For mobile
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable as WebDraggable } from 'react-beautiful-dnd';  // For web

export default function DragAndDropDemo() {
  if (Platform.OS === 'web') {
    // Web drag-and-drop
    return (
      <DragDropContext onDragEnd={(result) => console.log(`DragDropContext Result`, result)}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <WebDraggable draggableId="1" index={1}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Text style={{ color: `white` }}>Draggable Item (Web)</Text>
                    </div>
                  )}
                </WebDraggable>
                {provided.placeholder}
              </div>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <WebDraggable draggableId="2" index={2}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Text style={{ color: `white` }}>Draggable Item (Web)</Text>
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
  } else {
    // Mobile drag-and-drop
    return (
      <View>
        <Draggable x={75} y={100}>
          <View>
            <Text style={{ color: `white` }}>Draggable Item (Mobile)</Text>
          </View>
          <View>
            <Text style={{ color: `white` }}>Draggable Item (Mobile)</Text>
          </View>
        </Draggable>
      </View>
    );
  }
};