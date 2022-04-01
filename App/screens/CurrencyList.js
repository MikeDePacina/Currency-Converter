import React, { useContext } from "react";
import { StatusBar, View, FlatList, StyleSheet } from "react-native";
import colors from "../constants/colors";
import currencies from "../data/currencies.json";
import { RowItem, RowSeparator } from "../components/RowItem";
import { Entypo } from "@expo/vector-icons";
import { ConversionContext } from "../util/ConversionContext";
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation, route }) => {
  const params = route.params || {};
  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } =
    useContext(ConversionContext);
  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          let selected = false;
          if (params.isBaseCurrency && item === baseCurrency) selected = true;
          else if (!params.isBaseCurrency && item === quoteCurrency)
            selected = true;
          return (
            <RowItem
              text={item}
              onPress={() => {
                if (params.isBaseCurrency) setBaseCurrency(item);
                else setQuoteCurrency(item);
              }}
              rightIcon={
                selected && (
                  <View style={styles.icon}>
                    <Entypo name="check" size={20} color={colors.white} />
                  </View>
                )
              }
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <RowSeparator />}
      />
    </View>
  );
};
