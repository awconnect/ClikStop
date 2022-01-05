import React, { useEffect, useState, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppContext } from './App';
import getTimeIncrements from "./App";
import { styles } from './App';



 export default function StopWatch() {

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
    
    if (!started) {
      return (
        <View style={styles.container}>
          <View>
            <Text>{getTimeIncrements(time)}</Text>
  
          </View>
  
          <View>
            {/* <Text> Best Time: {getTimeIncrements(topTimes)} </Text> */}
            <Button title='Start' onPress={isStarted}/>
            <Button title='Reset' onPress={reset}/>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Text>{getTimeIncrements(time)}</Text>
          </View>
    
          <View>
            {/* <Text> Best Time: {getTimeIncrements(topTime)} </Text> */}
            <Button title='Stop' onPress={isStarted}/>
            <Button title='Reset' onPress={reset}/>
          </View>
        </View>
      );
    }
  }