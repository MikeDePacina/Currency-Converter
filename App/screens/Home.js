import React, { useState, useContext } from "react";
import { format } from "date-fns";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import colors from "../constants/colors";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { Entypo } from "@expo/vector-icons";
import CurrencyList from "./CurrencyList";
import { ConversionContext } from "../util/ConversionContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: 5,
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },

  content: {
    paddingTop: screen.height * 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  logocontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logobackground: {
    width: screen.width * 0.45,
    height: screen.height * 0.45,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.height * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  text: {
    color: colors.white,
    fontSize: 13,
    textAlign: "center",
  },
});

export default ({ navigation }) => {
  const [value, setValue] = useState("0");

  const { baseCurrency, quoteCurrency, date, swapCurrencies, rate, isLoading } =
    useContext(ConversionContext);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const conversionRate = rate[quoteCurrency];
  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
        <SafeAreaView style={styles.AndroidSafeArea}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.push("Options")}
          >
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <View style={styles.logocontainer}>
            <Image
              source={require("../assets/images/background.png")}
              style={styles.logobackground}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textHeader}> Currency Converter</Text>
          {isLoading ? (
            <ActivityIndicator color={colors.white} size="large" />
          ) : (
            <>
              <ConversionInput
                text={baseCurrency}
                value={value}
                onButtonPress={() =>
                  navigation.push("Currencies", {
                    title: "Base Currency",
                    activeCurrency: baseCurrency,

                    isBaseCurrency: true,
                  })
                }
                onChangeText={(text) => setValue(text)}
                keyboardType="numeric"
              />
              <ConversionInput
                text={quoteCurrency}
                value={
                  value && `${parseFloat(value * conversionRate).toFixed(2)}`
                }
                editable={false}
                onButtonPress={() =>
                  navigation.push("Currencies", {
                    title: "Quote Currency",
                    activeCurrency: quoteCurrency,

                    isBaseCurrency: false,
                  })
                }
              />
              <Text style={styles.text}>
                {" "}
                {`1 ${baseCurrency} is ${conversionRate} ${quoteCurrency} as of ${
                  date && format(new Date(date), "MMMM d, yyyy")
                }`}{" "}
              </Text>

              <Button
                onPress={() => swapCurrencies()}
                text="Reverse currencies"
              />
            </>
          )}
        </View>
        <KeyboardSpacer
          onToggle={(keyboardIsVisible) => setScrollEnabled(keyboardIsVisible)}
        />
      </ScrollView>
    </View>
  );
};
