import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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

  return (
    <View style={styles.container}>
      {!started&&
      <Text>Time elapsed: {time}</Text>
      } 
      <Text>Count: {count}</Text>
      <Button title='change count' onPress={handleChange}/>:
      <StatusBar style="auto" />
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
