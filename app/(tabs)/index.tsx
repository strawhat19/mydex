import { StyleSheet } from 'react-native';
// import DNDYT from '../components/drag-and-drop/dndyt/dndyt';
import { defaultTabStyles, View } from '@/components/Themed';
import DragAndDropDemo from '../components/drag-and-drop/drag-and-drop-demo/drag-and-drop-demo';

export default function Home() {
  return (
    <View style={styles.container}>
      <DragAndDropDemo />
      {/* <DNDYT /> */}
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);