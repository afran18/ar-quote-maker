import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CustomerDetailsPage.module.css";
import CustomInput from "../components/CustomInput";

function CustomerDetailsPage() {
  const navigate = useNavigate();

  const [customerForm, setCustomerForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  });

  const handleChange = (e) => {
  setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/quote", { state: customerForm });
  };

  return (
    <div className={styles.container}>
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit} className={styles.customerForm}>
        <div className={styles.formItem}>
          <CustomInput
            label="Name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerForm.customerName}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        <div className={styles.formItem}>
          <CustomInput
            label="Email"
            type="text"
            name="customerEmail"
            id="customerEmail"
            value={customerForm.customerEmail}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        <div className={styles.formItem}>
          <CustomInput
            label="Phone"
            type="phone"
            name="customerPhone"
            id="customerPhone"
            value={customerForm.customerPhone}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        <div className={styles.formItem}>
          <CustomInput
            label="Address"
            type="text"
            name="customerAddress"
            id="customerAddress"
            value={customerForm.customerAddress}
            onChange={handleChange}
            className={styles.form}
          />
        </div>
        
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default CustomerDetailsPage;
