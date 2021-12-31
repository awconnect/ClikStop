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

  function convToFullTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var ms = (millis % 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + ms;
  }

  if (!started) {
    return(
      <View style={styles.container}>
        <Text>Time elapsed: {convToFullTime(time)}</Text>
        <Button title='change count' onPress={handleChange}/>
        <StatusBar style="auto" />
      </View>

    );
  } else {
    return (
      <View style={styles.container}>


        <StopWatch convToFullTime = {convToFullTime}/>
        <Button title='change count' onPress={handleChange}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

function StopWatch({convToFullTime}) {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMs(ms => ms + 1);
    }, );
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <Text>{convToFullTime(ms*2)} seconds have passed</Text>
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
