import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SudokuBoard from './components/SudokuBoard'

export default function App() {

  const getSelectedCell = () => {
    const { board } = this.state;
    const selected = board.get('selected');
    return selected && board.get('puzzle').getIn([selected.x, selected.y]);
  }

  const renderCell = (cell, x, y) => {
    const { board } = this.state;
    const selected = this.getSelectedCell();
    const {value, prefilled, notes } = cell.toJSON();
    const sharesGroup = areGroupMembers({x, y}, board.get('selected'));
    const sameValue = !!(selected && selected.get('value') && value === selected.get('value'));
    const isSelected = cell === selected;
    // conflict
    
    return (<Cell 
      prefilled = {prefilled}
      notes = {notes}
      sameValue = {sameValue}
      isSelected = {isSelected}
      sharesGroup = {sharesGroup}
      value = {value}
      onClick={() => { this.selectCell(x, y); }}
      key={y}
      x={x}
      y={y}
      // conflict
      />);
  }

  const renderPuzzle = () => {
    const { board } = this.state;
    return (
      <div className='puzzle'>
        {board.get('puzzle').map((row, i) => (
          <div key = {i} className='row'>
            {
              row.map((cell, j) => this.renderCell(cell, i, j)).toArray()
            }
          </div>
        )).toArray()
        }
        {/* style */}
      </div>
    );
  }

  // const render = () => {
  //   const { board } = this.state;
  // }

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