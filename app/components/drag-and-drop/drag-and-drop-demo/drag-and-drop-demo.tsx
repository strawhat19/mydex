import React from 'react';
import { View } from 'react-native';
import { appleBlue } from '@/components/Themed';
import DraggableGrid from '../draggable-grid/draggable-grid';
// import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
// import { DragDropContext, Droppable, Draggable as WebDraggable } from 'react-beautiful-dnd';

export const draggableCardStyle = { margin: 10, backgroundColor: appleBlue, padding: 20, borderRadius: 10 };

export const mobileDraggableItems = () => {
  return (
    <View style={{ flex: 1, width: `100%`, justifyContent: `center`, alignItems: `center` }}>
      <DraggableGrid />
    </View>
  );
};

// export const webDraggableItems = () => {
//   let [webCards, setWebCards] = useState([
//     {
//       id: 1,
//       color: `white`,
//     },
//     {
//       id: 2,
//       color: `white`,
//     },
//     {
//       id: 3,
//       color: `white`,
//     },
//   ]);

//   return (
//     <DragDropContext onDragEnd={(result) => console.log(`DragDropContext Result`, result)}>
//       <Droppable droppableId={`droppable`}>
//         {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
//           <div className={`draggableCardContainer webCardContContainer`}>
//             {webCards.map((wc: any, idx: any) => {
//               return (
//                 <div key={idx} className={`draggableCardWrapper webCardContWrapper`} ref={provided.innerRef} {...provided.droppableProps}>
//                   <WebDraggable draggableId={wc.id.toString()} index={idx}>
//                     {(provided) => (
//                       <div className={`draggableCardCont webCardContCont`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                         <div className={`draggableCard webCard`} style={draggableCardStyle}>
//                           <Text style={{ color: `white` }}>Draggable Item {idx + 1} (Web)</Text>
//                         </div>
//                       </div>
//                     )}
//                   </WebDraggable>
//                   {provided.placeholder}
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

export default function DragAndDropDemo() {
    return mobileDraggableItems();
  // if (Platform.OS === `web`) {
  //   return mobileDraggableItems();
  //   // return webDraggableItems();
  // } else {
  //   return mobileDraggableItems();
  // }
};