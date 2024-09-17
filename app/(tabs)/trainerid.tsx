import { StyleSheet } from 'react-native';
import { defaultTabStyles } from './styles';
import { Text, View } from '@/components/Themed';

export default function TrainerID() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer ID</Text>
      <View style={styles.separator} lightColor={`#eee`} darkColor={`rgba(255,255,255,0.1)`} />
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);