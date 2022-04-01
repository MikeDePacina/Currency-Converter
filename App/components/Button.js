import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
  buttonIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
});

export const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("../assets/images/reverse.png")}
        style={styles.buttonIcon}
        resizeMode="contain"
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
