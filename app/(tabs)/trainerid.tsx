import { defaultTabStyles } from './styles';
import { Text, View } from '@/components/Themed';
import { Alert, Button, StyleSheet } from 'react-native';

export default function TrainerID() {
  const onButtonPress = () => {
    Alert.alert(`Button Press`);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer ID</Text>
      <View style={styles.separator} lightColor={`#eee`} darkColor={`rgba(255,255,255,0.1)`} />
      <Button title={`Button`} onPress={() => onButtonPress()} />
    </View>
  );
}

const styles = StyleSheet.create(defaultTabStyles as any);