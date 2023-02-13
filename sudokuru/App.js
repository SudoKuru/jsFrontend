import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SudokuBoard from './components/SudokuBoard';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Sudoku Board Demo</Text>

      <SudokuBoard/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});