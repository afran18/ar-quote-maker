import { useContext } from "react";
import { QuoteContext } from "./QuoteContext.jsx";

export const useQuote = () => useContext(QuoteContext);
