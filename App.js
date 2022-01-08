import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
// import StopWatch  from './StopWatch';
// import Leaderboard from './Leaderboard';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const AppContext = React.createContext();

const Leaderboard = () => {
  const {state, dispatch} = useContext(AppContext);
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

      }
      else {
        let arr = state.topTimes;
        if (time.getTime() < arr[4] && !(state.topTimes.includes(time.getTime()) )) {
          arr[4] = time.getTime();
          arr.sort();
          changeTopTimesValue(arr);
        }

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

  return (
    <View style={styles.container}>
      <View>
        <Text>{getTimeIncrements(time)}</Text>
      </View>

      <View>
        <Button title='Start/Stop' onPress={isStarted}/>
        <Button title='Reset' onPress={reset}/>
      </View>
    </View>
  );
}


const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="StopWatch"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      // style={{ backgroundColor: '#08457e' }}
      barStyle= {{
        //  height : 75, 
         backgroundColor: '#2c3b42' 
        }}
    >
      <Tab.Screen
        name="StopWatch"
        component={StopWatch}
        options={{
          tabBarLabel: 'StopWatch',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="timer" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
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
    {/* <View style={styles.container}>
        <StopWatch />
        <View style={styles.container}>
          <Leaderboard />
        </View>
    </View> */}
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
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
