import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import Home from "../screens/Home";
import Options from "../screens/Options";
import CurrencyList from "../screens/CurrencyList";
import { TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import { ConversionContextProvider } from "../util/ConversionContext";
const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="Options" component={Options} />
    <MainStack.Screen
      name="Currencies"
      component={CurrencyList}
      options={({ route, navigation }) => ({
        title: route.params && route.params.title,
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingHorizontal: 10 }}
          >
            <Entypo name="cross" size={30} color={colors.blue} />
          </TouchableOpacity>
        ),
      })}
    />
  </MainStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ConversionContextProvider>
      <MainStackScreen />
    </ConversionContextProvider>
  </NavigationContainer>
);
