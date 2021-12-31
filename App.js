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

  if (!started) {
    return(
      <View style={styles.container}>
        <Button title='change count' onPress={handleChange}/>
        <StatusBar style="auto" />
      </View>

    );
  } else {
    return (
      <View style={styles.container}>

        <Text>Time elapsed: {time}</Text>

        <StopWatch />
        <Text>Count: {count}</Text>
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
      setSecond(second => second + 1);
    }, 1000);
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
