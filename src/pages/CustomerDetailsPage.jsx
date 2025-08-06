import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CustomerDetailsPage.module.css";
import CustomInput from "../components/CustomInput";
import { useCustomer } from "../context/CustomerContext.jsx";

function CustomerDetailsPage() {
  const navigate = useNavigate();
  const {
    setCustomerId,
    updateCustomer,
    customer,
    isEditingCustomer,
    setIsEditingCustomer,
  } = useCustomer();

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

  useEffect(() => {
    if (
      customer?.name ||
      customer?.email ||
      customer?.phone ||
      customer?.address
    ) {
      setCustomerForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    }
  }, [customer]);

  //Actions while submitting form
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: customerForm.name.trim() === "",
      email: customerForm.email.trim() === "",
      phone: customerForm.phone.trim() === "",
      address: customerForm.address.trim() === "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);

    try {
      console.log("before update editing state: ", isEditingCustomer);
      console.log("before update customer id: ", customer.id);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const url = isEditingCustomer
        ? `${backendUrl}/customer/${customer.id}`
        : `${backendUrl}/customer`;
      const method = isEditingCustomer ? "PUT" : "POST";

      if (!backendUrl) {
        throw new Error("VITE_BACKEND_URL is not defined in your .env files!");
      }
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerForm),
      });

      console.log("Fetch response object:", response);

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with error:", errorText);
        throw new Error("Server Error: " + errorText);
      }

      const data = await response.json();
      console.log("Data : ", data);
      console.log("Customer: ", data.customer);

      setCustomerId(data.customer.id);
      console.log("Customer ID: ", data.customer.id);

      const quoteDate = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      updateCustomer({
        ...data.customer,
        date: quoteDate,
      });
      if (isEditingCustomer) {
        setIsEditingCustomer(false);
      }

      navigate("/quote");
    } catch (err) {
      console.error("Failed to submit customer", err);
      setSubmitError("There was an error in adding customer, please try again");
    } finally {
      setLoading(false);
    }
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
            error={errors.email}
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

        <button
          type="submit"
          disabled={loading}
          className={styles.buttonCustomerSubmit}
        >
          {loading ? "Submitting..." : isEditingCustomer ? "Update" : "Next"}
        </button>
      </form>
      {submitError && <p className={styles.errorText}>{submitError}</p>}
    </div>
  );
}

export default CustomerDetailsPage;
