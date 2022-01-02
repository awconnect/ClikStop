import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);


  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        if (startTime === 0) {
          setStartTime(Date.now());
        }
        setTime(Date.now() - startTime);
      }, 10);
    } else if (!started && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [started, time]);

  const reset = () => {
    setTime(0);
    setStarted(false);
    setStartTime(0);
  }

  const isStarted = () => {
    setStarted(!started);
  }

  function convToFullTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var ms = (millis % 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + ms;
  }

  if (!started) {
    return (
      <View style={styles.container}>
        <View>
          <Text>{convToFullTime(time)}s</Text>
        </View>
  
        <View>
          <Button title='Start' onPress={isStarted}/>
          <Button title='Reset' onPress={reset}/>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View>
          <Text>{convToFullTime(time)}s</Text>
        </View>
  
        <View>
          <Button title='Stop' onPress={isStarted}/>
          <Button title='Reset' onPress={reset}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
