import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Component } from 'react-native';

function oneIndexedIntArr (n)
{
  return Array.from(Array(n + 1).keys()).slice(1);
}

const Cell = (props) => {
  const {
    value, onClick, sharesGroup, isSelected, sameValue, prefilled, notes //, conflict
  } = props;
  // style stuff
  return (
    <View className="cell" onClick={onClick}>
      {
        notes ?
          oneIndexedIntArr(9).map(i =>
            <View key={i} className="note">
              {notes.has(i) && i}
            </View>
          ) 
        : value && value
      }
    </View>
  )
  // style definitions
}

const highlightColorControl = ({
  sharesGroup, sameValue, isSelected,
}) => {
  if (sharesGroup && sameValue) {
    return '#FFAB91';
  }
  else if (sameGroup) {
    return '#B3E5FC';
  }
  else if (sameValue) {
    return '#4FC3F7';
  }
  else if (isSelected) {
    return '#81D4FA';
  }
}

const fontColorControl = ({
  value, prefilled
}) => {
  if (value && !prefilled) {
    return '#000000';
  }
  return false;
}

const buildBoard = ({puzzle}) => {
  const rows = Array.from(Array(9).keys()).map(() => makeCountObject());
  const cols = Array.from(Array(9).keys()).map(() => makeCountObject());
  const sqrs = Array.from(Array(9).keys()).map(() => makeCountObject());
  const result = puzzle.map((row, i) => (
    row.map((cell, j) => {
      if (cell) {
        rows[i][cell] += 1;
        cols[j][cell] += 1;
        sqrs[((Math.floor(i / 3)) * 3) + Math.floor(j / 3)]
      }
    })
  ))
}

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
      <Text>Open up App.js to start working on your app! {oneIndexedIntArr(9)}</Text>
      
      {/* {board && this.renderPuzzle()} */} 

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