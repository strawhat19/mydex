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
  const [tasks, setTasks] = useState(tasksData);
  const activeTask = useSharedValue<any>(null);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Gesture handler for dragging
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = offsetX.value;
      context.startY = offsetY.value;
    },
    onActive: (event, context: any) => {
      offsetX.value = context.startX + event.translationX;
      offsetY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    },
  });

  const dragTask = (task: string, fromColumn: string) => {
    activeTask.value = { task, fromColumn };
  };

  const dropTask = (toColumn: string) => {
    if (activeTask.value) {
      const { task, fromColumn } = activeTask.value;
      setTasks((prevTasks) => {
        const newTasks: any = { ...prevTasks };
        // Remove task from the previous column
        newTasks[fromColumn] = newTasks[fromColumn].filter((t: any) => t !== task);
        // Add task to the new column
        newTasks[toColumn].push(task as any);
        return newTasks;
      });
      activeTask.value = null;
    }
  };

  // Animated style for draggable items
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.board}>
        {columns.map((column) => (
          <View key={column} style={styles.column}>
            <Text style={styles.columnTitle}>{column}</Text>
            <View style={styles.tasksContainer}>
              {((tasks as any)[column] as any).map((task: any) => (
                <PanGestureHandler
                  key={task}
                  onGestureEvent={gestureHandler}
                  onEnded={() => dropTask(column)}
                >
                  <Animated.View style={[styles.task, animatedStyle]}>
                    <Text style={styles.taskText}>
                        {task}
                    </Text>
                  </Animated.View>
                </PanGestureHandler>
              ))}
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
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  board: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  taskText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});