import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import CoolButton from "./components/CoolButton";
import SudokuBoard from './components/SudokuBoard';
import { createRoot } from "react-dom/client";
import { Platform } from "react-native";
import { registerRootComponent } from 'expo';
import "expo/build/Expo.fx";
import { activateKeepAwake } from "expo-keep-awake";

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
}

if (__DEV__) {
  activateKeepAwake();
}

if (Platform.OS === "web") {
  const root = createRoot(
    document.getElementById("root") ?? document.getElementById("main")
  );
  root.render(<SudokuBoard/>);
} else {
  registerRootComponent(SudokuBoard);
}

/*export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app! {oneIndexedIntArr(9)}</Text>
    //   <StatusBar style="auto" />
    // </View>

    <SudokuBoard/>

    // <CoolButton/>
  );
}
*/
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
