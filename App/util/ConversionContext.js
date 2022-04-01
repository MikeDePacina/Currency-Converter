import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { api } from "./api";
export const ConversionContext = createContext();

const DEFAULT_BASE_CURRENCY = "USD";
const DEFAULT_QUOTE_CURRENCY = "PHP";
export const ConversionContextProvider = ({ children }) => {
  const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [quoteCurrency, setQuoteCurrency] = useState(DEFAULT_QUOTE_CURRENCY);
  const [rate, setRates] = useState({});
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
  };

  const setBaseCurrency = async (currency) => {
    setIsLoading(true);
    try {
      const response = await api(`/latest?base=${baseCurrency}`);
      console.log(response);
      _setBaseCurrency(currency);
      setDate(response.date);
      setRates(response.rates);
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const contextValue = {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    setBaseCurrency,
    setQuoteCurrency,
    date,
    rate,
    isLoading,
  };

  useEffect(() => {
    setBaseCurrency(DEFAULT_BASE_CURRENCY);
  }, []);
  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
