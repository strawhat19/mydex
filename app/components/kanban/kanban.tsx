import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

const columns = ['To Do', 'In Progress', 'Done'];

const tasksData = {
  'To Do': ['Task 1', 'Task 2'],
  'In Progress': ['Task 3'],
  Done: ['Task 4'],
};

export default function Kanban() {
  const [tasks, setTasks] = useState<any>(tasksData);

  const dragTask = (task: string, fromColumn: string) => {
    return { task, fromColumn };
  };

  const dropTask = (toColumn: string, taskData: any) => {
    const { task, fromColumn } = taskData;
    setTasks((prevTasks: any) => {
      const newTasks: any = { ...prevTasks };
      // Remove task from the previous column
      newTasks[fromColumn] = newTasks[fromColumn].filter((t: any) => t !== task);
      // Add task to the new column
      newTasks[toColumn].push(task as any);
      return newTasks;
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.board}>
        {columns.map((column) => (
          <View key={column} style={styles.column}>
            <Text style={styles.columnTitle}>{column}</Text>
            <View style={styles.tasksContainer}>
              {tasks[column].map((task: string) => {
                // Create unique shared values for each task
                const offsetX = useSharedValue(0);
                const offsetY = useSharedValue(0);
                const isDragging = useSharedValue(false);

                // Gesture handler for dragging each task
                const gestureHandler = useAnimatedGestureHandler({
                  onStart: (event, context) => {
                    isDragging.value = true;
                    context.startX = offsetX.value;
                    context.startY = offsetY.value;
                  },
                  onActive: (event, context: any) => {
                    offsetX.value = context.startX + event.translationX;
                    offsetY.value = context.startY + event.translationY;
                  },
                  onEnd: () => {
                    isDragging.value = false;
                    offsetX.value = withSpring(0);
                    offsetY.value = withSpring(0);
                  },
                });

                // Animated style for draggable items
                const animatedStyle = useAnimatedStyle(() => {
                  return {
                    transform: [
                      { translateX: offsetX.value },
                      { translateY: offsetY.value },
                    ],
                    zIndex: isDragging.value ? 1 : 0, // Elevate the dragged item
                    elevation: isDragging.value ? 5 : 0, // Elevation for Android
                    shadowOpacity: isDragging.value ? 0.3 : 0, // Shadow for iOS
                    shadowRadius: isDragging.value ? 10 : 0,
                    shadowOffset: isDragging.value ? { width: 0, height: 5 } : { width: 0, height: 0 },
                  };
                });

                return (
                  <PanGestureHandler
                    key={task}
                    onGestureEvent={gestureHandler}
                    onEnded={() => dropTask(column, dragTask(task, column))}
                  >
                    <Animated.View style={[styles.task, animatedStyle]}>
                      <Text style={styles.taskText}>{task}</Text>
                    </Animated.View>
                  </PanGestureHandler>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  board: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    margin: 5,
    padding: 10,
    width: `100%`,
    height: `100%`,
    minHeight: 150,
    borderRadius: 5,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
  },
  columnTitle: {
    fontSize: 18,
    color: `white`,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tasksContainer: {
    minHeight: 100,
  },
  task: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
  taskText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});