import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {StyleSheet, View } from 'react-native';
import StopWatch  from './StopWatch';
import Leaderboard from './Leaderboard';

// export const AppContext = React.createContext();

// const initialState = {
//   topTimes: [],
// };


export const getTimeIncrements = (date) => {
  var hour = date.getUTCHours()
    , min = date.getUTCMinutes()
    , sec = date.getUTCSeconds()
    , ms = date.getUTCMilliseconds();
    return ((hour > 9 ? hour : "0" + hour) + ":" + 
    (min > 9 ? min : "0" + min) + ":" + 
    (sec > 9 ? sec : "0" + sec) + "." + 
    (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms));
}


// function reducer(state, action) {
//   switch (action.type) {
//       case 'UPDATE_INPUT':
//           return {
//               topTimes: action.data
//           };

//       default:
//           return initialState;
//   }
// }




export default function App() {
  //const [state, dispatch] = useReducer(reducer, initialState);
  

 return (
    <View style={styles.container}>
        <StopWatch />
        {/* <Leaderboard /> */}
    </View>
 );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
