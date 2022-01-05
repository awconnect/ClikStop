import React, { useEffect, useState } from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';

function StopWatch() {

    const [started, setStarted] = useState(false);
    const [isFirst, setIsFirst] = useState(false);
    let defTime = new Date();
    const [time, setTime] = useState(new Date(defTime - defTime));
    const [startTime, setStartTime] = useState(null);
    const [topTimes, setTopTimes] = useState([]);
  
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
        if (topTimes === [] || ((topTimes.length < 5) && !(topTimes.includes(time.getTime())) ) ) {
          setTopTimes([...topTimes, time.getTime()].sort());
          //setTopTimes([...topTimes, time.getTime()].sort());
          // setTopTimes(time);
        }
        else {
          let arr = topTimes;
          if (time.getTime() < arr[4] && !(topTimes.includes(time.getTime()) )) {
            arr[4] = time.getTime();
            arr.sort();
            setTopTimes(arr);
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
  
    if(topTimes === []) {
      if (!started) {
        return (
          <View style={styles.container}>
            <View>
              <Text>{getTimeIncrements(time)}</Text>
            </View>
    
            <Button title='Start' onPress={isStarted}/>
            <Button title='Reset' onPress={reset}/>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View>
              <Text>{getTimeIncrements(time)}</Text>
            </View>
  
            <Button title='Stop' onPress={isStarted}/>
            <Button title='Reset' onPress={reset}/>
          </View>
        );
      }
    } 
    
    if (!started) {
      return (
        <View style={styles.container}>
          <View>
            <Text>{getTimeIncrements(time)}</Text>
  
          </View>
  
          <View>
            {/* <Text> Best Time: {getTimeIncrements(topTimes)} </Text> */}
            <View>
                <Text>Leaderboard:</Text>
                {
                topTimes.map((topTime) => (
                    <Text key ={topTime}>{getTimeIncrements(new Date(topTime) )}</Text>
                ))
                }
            </View>

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
            <View>
                <Text>Leaderboard:</Text>
                {
                topTimes.map((topTime) => (
                    <Text key ={topTime}>{getTimeIncrements(new Date(topTime) )}</Text>
                ))
                }
            </View>

            <Button title='Stop' onPress={isStarted}/>
            <Button title='Reset' onPress={reset}/>
          </View>
        </View>
      );
    }
  }

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

export default function App() {  

 return (
    <View style={styles.container}>
        <StopWatch />
        {/* <Leaderboard /> */}
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
