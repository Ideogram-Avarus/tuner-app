import { useTunerInfo } from '@/hooks/useTunerInfo';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
  const { isRunning, hasPermission, result } = useTunerInfo()

  return (
    <View style={styles.center}>
        <Text style={{ color: 'white'}}>Is Tuner On: {isRunning ? 'ON' : 'OFF'}</Text>
        <Text style={{ color: 'white'}}>Permission: {hasPermission ? 'Granted' : 'Not Granted'}</Text>
        <Text style={{ color: 'white'}}>{JSON.stringify(result, null, 2)}</Text>
    </View>
  );
}

//<Button mode="contained" onPress={isOn ? stop : start}> {isOn ? 'Stop' : 'Start'}</Button>
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
