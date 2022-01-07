import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// import StopWatch  from './StopWatch';
// import Leaderboard from './Leaderboard';


export const AppContext = React.createContext();

const Leaderboard = () => {
  const {state, dispatch} = useContext(AppContext);
  return (
      <View>
          <Text>Leaderboard:</Text>
          {
          state.topTimes.map((topTime) => (
              <Text key ={topTime}>{getTimeIncrements(new Date(topTime) )}</Text>
          ))
          }
      </View>


  );
}

function StopWatch() {

  const {state, dispatch} = useContext(AppContext);

  const changeTopTimesValue = (newValue) => {
      dispatch({ type: 'UPDATE_INPUT', data: newValue});
  };

  const [started, setStarted] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  let defTime = new Date();
  const [time, setTime] = useState(new Date(defTime - defTime));
  const [startTime, setStartTime] = useState(null);
  //const [topTimes, setTopTimes] = useState([]);

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        if (startTime === null) {
          setStartTime(new Date());
        }
        let currentTime = new Date();
        setTime(new Date(currentTime - startTime));
      }, 1);
    } else if (!started && isFirst) {
      if (state.topTimes === [] || ((state.topTimes.length < 5) && !(state.topTimes.includes(time.getTime())) ) ) {
        changeTopTimesValue([...state.topTimes, time.getTime()].sort());
        //setTopTimes([...topTimes, time.getTime()].sort());
        // setTopTimes(time);
      }
      else {
        let arr = state.topTimes;
        if (time.getTime() < arr[4] && !(state.topTimes.includes(time.getTime()) )) {
          arr[4] = time.getTime();
          arr.sort();
          changeTopTimesValue(arr);
        }
        // setTopTimes(time<topTimes[4] ? [...topTimes, time].sort()[:5] : topTimes);
        
        // if (topTimes > time) {
        //    setTopTime(time);
        // } 
      }
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [started, time]);

  const reset = () => {
    let defTime = new Date();
    setTime(new Date(defTime - defTime));
    setStarted(false);
    setStartTime(null);
    setIsFirst(false);
  }

  const isStarted = () => {
    if (started === true) {
      setStartTime(null);
    }
    setStarted(!started);
    if (!isFirst) {
      setIsFirst(true);
    }
  }

  // if(state.topTimes === []) {
  //   if (!started) {
  //     return (
  //       <View style={styles.container}>
  //         <View>
  //           <Text>{getTimeIncrements(time)}</Text>
  //         </View>
  
  //         <Button title='Start' onPress={isStarted}/>
  //         <Button title='Reset' onPress={reset}/>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={styles.container}>
  //         <View>
  //           <Text>{getTimeIncrements(time)}</Text>
  //         </View>

  //         <Button title='Stop' onPress={isStarted}/>
  //         <Button title='Reset' onPress={reset}/>
  //       </View>
  //     );
  //   }
  // } 
  
  // if (!started) {
    return (
      <View style={styles.container}>
        <View>
          <Text>{getTimeIncrements(time)}</Text>

        </View>

        <View>
          {/* <Text> Best Time: {getTimeIncrements(topTimes)} </Text> */}
          <Button title='Start/Stop' onPress={isStarted}/>
          <Button title='Reset' onPress={reset}/>
        </View>
      </View>
    );
  // } 
  // else {
  //   return (
  //     <View style={styles.container}>
  //       <View>
  //         <Text>{getTimeIncrements(time)}</Text>
  //       </View>
  
  //       <View>
  //         {/* <Text> Best Time: {getTimeIncrements(topTime)} </Text> */}
  //         <Button title='Stop' onPress={isStarted}/>
  //         <Button title='Reset' onPress={reset}/>
  //       </View>
  //     </View>
  //   );
  // }
}







const initialState = {
  topTimes: [],
};


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


function reducer(state, action) {
  switch (action.type) {
      case 'UPDATE_INPUT':
          return {
              topTimes: action.data
          };

      default:
          return initialState;
  }
}




export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  

 return (
  <AppContext.Provider value={{ state, dispatch }}>
    <View style={styles.container}>
        <StopWatch />
        <View style={styles.container}>
          <Leaderboard />
        </View>
    </View>
  </AppContext.Provider>

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
