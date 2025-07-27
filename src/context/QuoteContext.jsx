import { createContext, useState } from "react";
import {v4 as uuidv4} from "uuid";


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
    const itemWithId = {...quoteItem, id: uuidv4()}
    setQuoteItems((prevQuoteItems) => [...prevQuoteItems, itemWithId]);
  };

  const removeItemFromQuote = (quoteItemId) => {
    setQuoteItems((prevQuoteItems) => 
      prevQuoteItems.filter((item) => item.id !== quoteItemId)
    );
  };

  
  const updateCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };
0
  const updateItemInQuote = (updatedItem) => {
  setQuoteItems((prevItems) =>
    prevItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    )
  );
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
        updateItemInQuote,
        resetQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
