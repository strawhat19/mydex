import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { defaultTabStyles } from './styles';
import DragAndDropDemo from '../components/drag-and-drop/drag-and-drop-demo/drag-and-drop-demo';

export default function Home() {
  return (
    <View style={styles.container}>
      <DragAndDropDemo />
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);