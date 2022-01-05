import React, { useContext } from 'react';
import {StyleSheet, View } from 'react-native';
// import { AppContext } from './App';
import getTimeIncrements from "./App";
import { styles } from './App';



const Leaderboard = () => {
    // const {state, dispatch} = useContext(AppContext);
    return (
        <View>
            <Text>Leaderboard:</Text>
            {
            state.topTimes.map((topTime) => (
                <Text key ={topTime}>{getTimeIncrements(new Date(topTime) )}</Text>
            ))
            }
        </View>


    );
}
 
export default Leaderboard;