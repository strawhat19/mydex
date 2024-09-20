import { StyleSheet } from 'react-native';
import BlurExample from '../components/blur-demo/blur-demo';
import { defaultTabStyles, View } from '@/components/Themed';

export default function TrainerID() {
  return (
    <View style={styles.container}>
      <BlurExample />
      {/* <Text style={styles.title}>Trainer ID</Text>
      <View style={styles.separator} lightColor={`#eee`} darkColor={`rgba(255,255,255,0.1)`} />
      <Button title={`Button`} onPress={() => onButtonPress()} /> */}
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);