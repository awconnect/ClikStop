import React, { useEffect, useState, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import getTimeIncrements from "./App";

export default function StopWatch() {

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
          <View>
            <View>
              <Text>{getTimeIncrements(time)}</Text>
            </View>
    
            <Button title='Start' onPress={isStarted}/>
            <Button title='Reset' onPress={reset}/>
          </View>
        );
      } else {
        return (
          <View>
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
        <View>
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
        <View>
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
  