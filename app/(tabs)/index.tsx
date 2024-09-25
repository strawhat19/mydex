import { StyleSheet } from 'react-native';
import { defaultTabStyles, View } from '@/components/Themed';
import DraggableGrid from '../components/drag-and-drop/draggable-grid/draggable-grid';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: `100%`, justifyContent: `center`, alignItems: `center` }}>
        <DraggableGrid />
      </View>
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);