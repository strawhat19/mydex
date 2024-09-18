import { StyleSheet } from 'react-native';
import { defaultTabStyles } from './styles';
import { Text, View } from '@/components/Themed';
import DragAndDropDemo from '../components/drag-and-drop/drag-and-drop-demo/drag-and-drop-demo';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>MyDex | Pokedex Clone</Text>
      <View style={styles.separator} lightColor={`#eee`} darkColor={`rgba(255,255,255,0.1)`} />
      <Text>Hello</Text> */}
      <DragAndDropDemo />
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);