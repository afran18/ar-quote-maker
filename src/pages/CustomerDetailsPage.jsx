import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CustomerDetailsPage.module.css";
import CustomInput from "../components/CustomInput";
import { useQuote } from "../context/useQuote";

function CustomerDetailsPage() {
  const navigate = useNavigate();
  const { customer, updateCustomer } = useQuote();

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomerForm({
      ...customerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quoteDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Save to context
    updateCustomer({
      ...customerForm,
      date: quoteDate,
    });
    console.log("Customer details updated:", customerForm);
    console.log("Customer from context", customer);
    
    

    // Navigate to next page
    navigate("/quote");
  };

  return (
    <div className={styles.container}>
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit} className={styles.customerForm}>
        <div className={styles.formItem}>
          <CustomInput
            label="Name"
            type="text"
            name="name"
            id="customerName"
            value={customerForm.name}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        <div className={styles.formItem}>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            id="customerEmail"
            value={customerForm.email}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        <div className={styles.formItem}>
          <CustomInput
            label="Phone"
            type="tel"
            name="phone"
            id="customerPhone"
            value={customerForm.phone}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        <div className={styles.formItem}>
          <CustomInput
            label="Address"
            type="text"
            name="address"
            id="customerAddress"
            value={customerForm.address}
            onChange={handleChange}
            className={styles.form}
          />
        </div>

        <button type="submit" className={styles.buttonCustomerSubmit}>
          Next
        </button>
      </form>
    </div>
  );
}

export default CustomerDetailsPage;
