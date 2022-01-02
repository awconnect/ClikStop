import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function StopWatch() {
  const [started, setStarted] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  let defTime = new Date();
  const [time, setTime] = useState(new Date(defTime - defTime));
  const [startTime, setStartTime] = useState(null);
  const [topTime, setTopTime] = useState(null);


  function getTimeIncrements(date) {
    var hour = date.getUTCHours()
      , min = date.getUTCMinutes()
      , sec = date.getUTCSeconds()
      , ms = date.getUTCMilliseconds();
     return ((hour > 9 ? hour : "0" + hour) + ":" + 
      (min > 9 ? min : "0" + min) + ":" + 
      (sec > 9 ? sec : "0" + sec) + "." + 
      (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms));
  }

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        if (startTime === null) {
          setStartTime(new Date());
        }
        let currentTime = new Date();
        setTime(new Date(currentTime - startTime));
      }, 10);
    } else if (!started && isFirst) {
      if (topTime === null) {
        setTopTime(time);
      }
      else {
        if (topTime > time) {
           setTopTime(time);
        } 
      }
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [started, time]);

  const reset = () => {
    let defTime = new Date()
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


  function convToFullTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var ms = (millis % 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + ms;
  }

  if(topTime === null) {
    return (
      <View style={styles.container}>
        <View>
          <Text>{getTimeIncrements(time)}</Text>
        </View>

        <Button title='Start' onPress={isStarted}/>
        <Button title='Reset' onPress={reset}/>
      </View>
    );
  }
  if (!started) {
    return (
      <View style={styles.container}>
        <View>
          <Text>{getTimeIncrements(time)}</Text>

        </View>
  
        <View>
          <Text> Best Time: {getTimeIncrements(topTime)} </Text>
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
          <Text> Best Time: {getTimeIncrements(topTime)} </Text>
          <Button title='Stop' onPress={isStarted}/>
          <Button title='Reset' onPress={reset}/>
        </View>
      </View>
    );
  }
}

export default function App() {
 return (
   <View style={styles.container}>
     <StopWatch />
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
