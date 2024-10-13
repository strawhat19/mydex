// import { BlurView } from 'expo-blur';
// import { web } from '@/shared/shared';
// import * as Haptics from 'expo-haptics';
// import { VertImageCard } from '@/common/types';
// import React, { useRef, useState } from 'react';
// // import Draggable from './draggable/draggable';
// import { useSharedValue } from 'react-native-reanimated';
// // import { useSharedValue } from 'react-native-reanimated';
// import { defaultVertImageCards } from '@/common/sample-data';
// import { Pagination } from 'react-native-reanimated-carousel';
// // import { useAnimatedStyle } from 'react-native-reanimated';
// import CustomImage from '@/components/custom-image/custom-image';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { appleBlue, Text, View, borderRadius } from '@/components/Themed';
// // import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
// import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
// import { Animated, FlatList, TouchableOpacity, Vibration, TouchableWithoutFeedback, StyleSheet, useWindowDimensions } from 'react-native';

// export default function Item() {
//     return <>
//         <ScaleDecorator>
//             <TouchableOpacity 
//                 onLongPress={drag}
//                 activeOpacity={0.5}
//                 disabled={indx != 0 || isActive} 
//                 style={{ flex: 1, width: `100%`, height: 100, opacity: isActive ? 0.5 : 1 }}
//             >
//                 <View id={`card-${item.id}`} style={{ flex: 1, width: `100%`, height: 100, backgroundColor: appleBlue }}>
//                     <Text style={styles.cardTitle}>
//                         Hello
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         </ScaleDecorator>
//                 <Animated.View 
//                     id={`card-${item.id}`} 
//                     style={{ backgroundColor: appleBlue, borderRadius, opacity: fadeAnim }}
//                 >
//                     <TouchableOpacity 
//                         onPress={drag}
//                         activeOpacity={0.5}
//                         disabled={indx != 0 || isActive} 
//                         onLongPress={() => openItemDetail(item)}
//                     >
//                         <View style={{ ...styles.card, backgroundColor: item.backgroundColor }}>
//                             <View style={styles.cardImageContainer}>
//                                 <CustomImage alt={item.name} source={{ uri: item.image }} style={styles.cardImage} />
//                             </View>
//                             <View style={styles.cardRight}>
//                                 <Text style={{ ...styles.cardTitle, ...item.fontColor && ({color: item.fontColor}) }}>
//                                     {item.name}
//                                 </Text>
//                                 <Text style={{ ...styles.cardDescription, ...item.fontColor && ({color: item.fontColor}) }}>
//                                     {item.description}
//                                 </Text>
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                 </Animated.View>
//     </>
// }