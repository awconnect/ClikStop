import React, { useContext } from 'react';
import {StyleSheet, View } from 'react-native';
import getTimeIncrements from "./App";



const Leaderboard = ({topTimes}) => {
    return (
        <View>
            <Text>Leaderboard:</Text>
            {
            topTimes.map((topTime) => (
                <Text key ={topTime}>{getTimeIncrements(new Date(topTime) )}</Text>
            ))
            }
        </View>


    );
}
 
export default Leaderboard;