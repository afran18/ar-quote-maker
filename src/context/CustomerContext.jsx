import { createContext, useContext, useState, useMemo, useCallback } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const getInitialCustomer = () => ({
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
  const [customer, setCustomer] = useState(getInitialCustomer());
  const [customerId, setCustomerId] = useState(null);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  const updateCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  const resetCustomer = useCallback(() => {
    setCustomer(getInitialCustomer());
    setCustomerId(null);
  }, []);

  const value = useMemo(
    () => ({
      customer,
      setCustomer,
      updateCustomer,
      resetCustomer,
      customerId,
      setCustomerId,
      isEditingCustomer,
      setIsEditingCustomer,
    }),
    [customer, customerId, isEditingCustomer, resetCustomer]
  );

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
