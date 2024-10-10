// // Kanban.tsx
// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Board, { Repository } from 'react-native-dnd-board'; // Importing Board and Repository

// const initialData = [
//   {
//     id: '1',
//     name: 'To Do',
//     rows: [
//       { id: '1-1', name: 'Task 1' },
//       { id: '1-2', name: 'Task 2' },
//     ],
//   },
//   {
//     id: '2',
//     name: 'In Progress',
//     rows: [
//       { id: '2-1', name: 'Task 3' },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Done',
//     rows: [
//       { id: '3-1', name: 'Task 4' },
//     ],
//   },
// ];

// export default function BoardComponent() {
//   const [repository] = useState(new Repository(initialData));

//   const renderRow = ({ item }) => (
//     <View style={styles.task}>
//       <Text style={styles.taskText}>{item.name}</Text>
//     </View>
//   );

//   const renderColumnWrapper = ({ item, columnComponent, layoutProps }) => (
//     <View style={styles.column} {...layoutProps}>
//       <Text style={styles.columnTitle}>{item.name}</Text>
//       {columnComponent}
//     </View>
//   );

//   const onDragEnd = (fromColumnId, toColumnId, row) => {
//     console.log(`Moved ${row.name} from ${fromColumnId} to ${toColumnId}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Board
//         repository={repository}
//         renderRow={renderRow}
//         renderColumnWrapper={renderColumnWrapper}
//         onDragEnd={onDragEnd}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     padding: 20,
//   },
//   column: {
//     flex: 1,
//     margin: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   columnTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   task: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   taskText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });