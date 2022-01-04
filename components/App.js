import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIconTextButtonsFooter1 from "../components/MaterialIconTextButtonsFooter1";

function App(props) {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.clikStop2}>ClikStop</Text>
        <Text style={styles.loremIpsum}>00:000</Text>
        <MaterialIconTextButtonsFooter1
          style={styles.materialIconTextButtonsFooter1}
        ></MaterialIconTextButtonsFooter1>
      </View>
      <TouchableOpacity style={styles.button}></TouchableOpacity>
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
    marginLeft: 26
  },
  clikStop2: {
    fontFamily: "impact-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 50
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 120,
    marginTop: 184,
    marginLeft: -21
  },
  materialIconTextButtonsFooter1: {
    height: 56,
    width: 375,
    backgroundColor: "rgba(18,18,0,1)",
    marginTop: 291,
    marginLeft: -26
  },
  button: {
    width: 375,
    height: 282,
    backgroundColor: "rgba(18,18,18,1)",
    marginTop: 333
  }
});

export default App;
