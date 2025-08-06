import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QuoteProvider } from "./context/QuoteContext.jsx";

import { CustomerProvider } from "./context/CustomerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomerProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </CustomerProvider>
  </StrictMode>
);
