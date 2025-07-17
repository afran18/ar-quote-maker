import { createContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
export const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  });

  const [quoteItems, setQuoteItems] = useState([]);

  const addItemToQuote = (quoteItem) => {
    setQuoteItems((prevQuoteItems) => [...prevQuoteItems, quoteItem]);
  };

  const removeItemFromQuote = (quoteItemId) => {
    setQuoteItems((prevQuoteItems) =>
      prevQuoteItems.filter((quoteItem) => quoteItem.id !== quoteItemId)
    );
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  const resetQuote = () => {
    setCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setQuoteItems([]);
  };

  return (
    <QuoteContext.Provider
      value={{
        customer,
        quoteItems,
        addItemToQuote,
        removeItemFromQuote,
        updateCustomer,
        resetQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
