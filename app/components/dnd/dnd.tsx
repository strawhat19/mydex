// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import Board, { Repository } from 'react-native-dnd-board';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// const mockData = [
//   {
//     id: '1',
//     name: 'Column 1',
//     rows: [
//       { id: '11', name: 'Row 1 (Column 1)' },
//       { id: '12', name: 'Row 2 (Column 1)' },
//       { id: '13', name: 'Row 3 (Column 1)' },
//       { id: '14', name: 'Row 4 (Column 1)' },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Column 2',
//     rows: [
//       { id: '21', name: 'Row 1 (Column 2)' },
//       { id: '22', name: 'Row 2 (Column 2)' },
//       { id: '23', name: 'Row 3 (Column 2)' },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Column 3',
//     rows: [
//       { id: '31', name: 'Row 1 (Column 3)' },
//       { id: '32', name: 'Row 2 (Column 3)' },
//     ],
//   },
// ];

// const COLUMN_WIDTH = Dimensions.get('window').width * 0.6;

// export default function Dnd() {
//   const [repository] = useState(new Repository(mockData));

//   const addCard = (columnId) => {
//     const newRow = {
//       id: `${columnId}${repository.columns[columnId].rows.length + 1}`,
//       name: `Row ${repository.columns[columnId].rows.length + 1} (Column ${columnId})`,
//     };
//     repository.addRow(columnId, newRow);
//   };

//   const deleteCard = (cardId) => {
//     repository.deleteRow(cardId);
//   };

//   const renderCard = ({ item }) => (
//     <View style={styles.card}>
//       <Text>{item.name}</Text>
//       <TouchableOpacity onPress={() => deleteCard(item.id)}>
//         <Text>✕</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderColumn = ({ item, columnComponent, layoutProps }) => (
//     <View style={styles.column} {...layoutProps}>
//       <Text>{item.name}</Text>
//       {columnComponent}
//       <TouchableOpacity onPress={() => addCard(item.id)}>
//         <Text>+ Add Card</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaProvider style={styles.container}>
//         <GestureHandlerRootView style={styles.container}>
//             <SafeAreaView style={styles.container}>
//                 <StatusBar backgroundColor="#014A81" />
//                 <Board
//                     repository={repository}
//                     renderRow={renderCard}
//                     renderColumnWrapper={renderColumn}
//                     columnWidth={COLUMN_WIDTH}
//                 />
//             </SafeAreaView>
//         </GestureHandlerRootView>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   column: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: '#F8FAFB',
//     borderRadius: 5,
//   },
//   card: {
//     marginVertical: 10,
//     padding: 10,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
// });