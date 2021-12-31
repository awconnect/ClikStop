import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  
  const handleChange = () => {
    let currentTime = Date.now();
    if (started){
      setTime(currentTime - time);
    } else {
      setTime(currentTime);
    }
    setStarted(!started);
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  if (!started) {
    return(
      <View style={styles.container}>
        <Text>Time elapsed: {millisToMinutesAndSeconds(time)}</Text>
        <Button title='change count' onPress={handleChange}/>
        <StatusBar style="auto" />
      </View>

    );
  } else {
    return (
      <View style={styles.container}>


        <StopWatch />
        <Button title='change count' onPress={handleChange}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

function StopWatch() {
  const [second, setSecond] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(second => second + 0.01);
    }, 1);
    return () => {
      clearInterval(interval);
    }
  }, []);
  return (
    <Text>{second} seconds have passed</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
