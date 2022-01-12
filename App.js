import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import StopWatch  from './StopWatch';
// import Leaderboard from './Leaderboard';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import {
//   useFonts,
//   Roboto_500Medium
// } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
// import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';




export const AppContext = React.createContext();

const Leaderboard = () => {
  const {state, dispatch} = useContext(AppContext);
  return (
      <View style={styles.container}>
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
        changeTopTimesValue([...state.topTimes, time.getTime()].sort((a, b) => a - b));

      }
      else {
        let arr = state.topTimes;
        if (time.getTime() < arr[4] && !(state.topTimes.includes(time.getTime())) ) {
          arr[4] = time.getTime();
          arr.sort((a, b) => a - b);
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
      <View style={styles.group}> 

        <Text style={styles.clikStop}>ClikStop</Text>


        <Text style={styles.stopWatchView}>{getTimeIncrements(time)}</Text>

        <View>
          <Button title='Start/Stop' onPress={isStarted}/>
          <Button title='Reset' onPress={reset}/>
        </View>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const tabBarOptions = {
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    "tabBarIndicatorStyle": {
      "backgroundColor": "red",
      "height": "0%"
    },
    tabBarStyle: { backgroundColor: 'rgba(18,18,18,1)'}
  }

  return (
    <Tab.Navigator
      initialRouteName="StopWatch"
      labelStyle={{ fontSize: 12 }}
      tabBarPosition = "bottom"
      screenOptions={tabBarOptions}
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
  
  // const [loaded] = useFonts({
  //   "impact-regular": require('./assets/fonts/impact-regular.ttf'),
  //   "roboto-700": require('./assets/fonts/roboto-700.ttf'),
  //   "roboto-regular": require('./assets/fonts/roboto-regular.ttf'),
  // });
  
  // if (!loaded) {
  //   return null;
  // }

  let [fontsLoaded] = useFonts({
    'ImpactRegular': require('./assets/fonts/IR.ttf'),
    'RobotoRegular': require('./assets/fonts/roboto-regular.ttf'),
    'Roboto700': require('./assets/fonts/roboto-700.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }



  // useEffect(() => {
  // (async () => await Font.loadAsync({
  //   Roboto: require('native-base/Fonts/Roboto.ttf'),
  //   Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  // }))();
  //  }, [])

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
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: "rgba(18,18,18,1)"
  },
  group: {
    width: 171,
    height: 61,
    marginTop: 60,
    marginLeft: 26
  },
  clikStop: {
    fontFamily: 'ImpactRegular',
    color: "rgba(74,74,74,1)",
    fontSize: 50
  },
  stopWatchView: {
    fontFamily: 'RobotoRegular',
    // color: "rgba(74,74,74,1)",
    color: "white",
    fontSize: 120,
    // marginTop: 184,
    marginTop: 184,
    marginLeft: -21
  },
  stopWatchTouchable: {
    width: 362,
    height: 140,
    marginTop: 185,
    marginLeft: 6
  },
  resetTouchable: {
    width: 375,
    height: 282,
    backgroundColor: "rgba(18,18,18,1)",
    marginTop: 9,
    alignSelf: "center"
  }
});
