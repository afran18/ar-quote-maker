import { createContext, useState, useMemo, useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable react-refresh/only-export-components */
const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {

  const [quoteItems, setQuoteItems] = useState([]);

  const addItemToQuote = (quoteItem) => {
    const itemWithId = { ...quoteItem, id: uuidv4() };
    setQuoteItems((prevQuoteItems) => [...prevQuoteItems, itemWithId]);
  };

  const removeItemFromQuote = (quoteItemId) => {
    setQuoteItems((prevQuoteItems) =>
      prevQuoteItems.filter((item) => item.id !== quoteItemId)
    );
  };

  

  const updateItemInQuote = (updatedItem) => {
    setQuoteItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

    const resetQuoteItems = useCallback(() => {
    setQuoteItems([]);
  }, []);


  const value = useMemo(
    () => ({
      quoteItems,
      addItemToQuote,
      removeItemFromQuote,
      updateItemInQuote,
      resetQuoteItems,
    }),
    [quoteItems, resetQuoteItems]
  );
  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext)