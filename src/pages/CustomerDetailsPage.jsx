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

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {
    name: customerForm.name.trim() === '',
    email: customerForm.email.trim() === '',
    phone: customerForm.phone.trim() === '',
    address: customerForm.address.trim() === '',
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some(Boolean);
  if (hasErrors) return;

  const quoteDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  updateCustomer({
    ...customerForm,
    date: quoteDate,
  });

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
            error={errors.name}
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
            error
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
            error={errors.phone}
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
            error={errors.address}
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
