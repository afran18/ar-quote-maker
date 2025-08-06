import { useCustomer } from "./CustomerContext.jsx";
import { useQuote } from "./QuoteContext.jsx";

export const useResetQuote = () => {
  const { resetCustomer } = useCustomer();
  const { resetQuoteItems } = useQuote();

  const resetQuote = () => {
    resetCustomer();
    resetQuoteItems();
  };

  return { resetQuote };
};
