import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIconTextButtonsFooter1 from "../components/MaterialIconTextButtonsFooter1";

function App1(props) {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <MaterialIconTextButtonsFooter1
          style={styles.materialIconTextButtonsFooter1}
        ></MaterialIconTextButtonsFooter1>
        <View style={styles.materialIconTextButtonsFooter1Filler}>
          <Text style={styles.clikStop}>ClikStop</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.leaderboard}>Leaderboard</Text>
        <Text style={styles.loremIpsum}>Lorem Ipsum</Text>
        <Text style={styles.loremIpsum3}>Lorem Ipsum</Text>
        <Text style={styles.loremIpsum2}>Lorem Ipsum</Text>
        <Text style={styles.loremIpsum1}>Lorem Ipsum</Text>
        <Text style={styles.loremIpsum4}>Lorem Ipsum</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(18,18,18,1)"
  },
  group: {
    width: 171,
    height: 61,
    marginTop: 60,
    marginLeft: 17
  },
  materialIconTextButtonsFooter1: {
    height: 56,
    width: 375,
    backgroundColor: "rgba(18,18,0,1)",
    marginTop: 678,
    marginLeft: -16
  },
  clikStop: {
    fontFamily: "impact-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 50
  },
  materialIconTextButtonsFooter1Filler: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    width: 264,
    height: 465,
    borderWidth: 1,
    borderColor: "rgba(52,51,51,1)",
    marginTop: 52,
    marginLeft: 56
  },
  leaderboard: {
    fontFamily: "roboto-700",
    color: "rgba(74,74,74,1)",
    height: 33,
    width: 234,
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
    marginTop: 18,
    marginLeft: 15
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    height: 22,
    width: 234,
    textAlign: "center",
    marginTop: 12,
    marginLeft: 15
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    height: 22,
    width: 234,
    textAlign: "center",
    marginLeft: 15
  },
  loremIpsum2: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    height: 22,
    width: 234,
    textAlign: "center",
    marginLeft: 15
  },
  loremIpsum1: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    height: 22,
    width: 234,
    textAlign: "center",
    marginLeft: 15
  },
  loremIpsum4: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    height: 22,
    width: 234,
    textAlign: "center",
    marginLeft: 15
  }
});

export default App1;
