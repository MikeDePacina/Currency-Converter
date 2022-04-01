import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Linking,
  StatusBar,
} from "react-native";
import colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { RowItem, RowSeparator } from "../components/RowItem";
import { Alert } from "react-native-web";

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: 5,
    flex: 1,
  },
});

const openURL = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert("Invalid url");
  });
};

export default () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowItem
          text="Themes"
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />

        <RowSeparator />

        <RowItem
          onPress={() =>
            openURL("httdsps://open.spotify.com/album/6Pe5LGQgU3mmvuRjFMsACV")
          }
          text="React Native Basics"
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />

        <RowSeparator />

        <RowItem
          onPress={() =>
            openURL("https://open.spotify.com/album/6Pe5LGQgU3mmvuRjFMsACV")
          }
          text="React Native By Example"
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
