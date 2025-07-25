import React, { useState, useEffect } from "react";
import QuoteDetails from "../components/QuoteDetails";
import QuoteForm from "../components/QuoteForm";
import { calcSqft, calcTotalSqft, calcAmount } from "../utils/calcUtils";
import styles from "./QuoteFormPage.module.css";
import { useQuote } from "../context/useQuote";

function QuoteFormPage() {
  const { addItemToQuote, quoteItems } = useQuote();

  const [quoteForm, setQuoteForm] = useState({
    itemDescription: "",
    height: "",
    width: "",
    quantity: 1,
    ratePerSqft: 0,
    sqft: 0,
    totalSqft: 0,
    amount: 0,
    lumpsum: false,
  });

  const [errors, setErrors] = useState({
    itemDescription: false,
    height: false,
    width: false,
    quantity: false,
    ratePerSqft: false,
  });

  const resetForm = () => {
    setQuoteForm({
      itemDescription: "",
      height: "",
      width: "",
      quantity: 1,
      ratePerSqft: 0,
      sqft: 0,
      totalSqft: 0,
      amount: 0,
      lumpsum: false,
    });
    setErrors({
      itemDescription: false,
      height: false,
      width: false,
      quantity: false,
      ratePerSqft: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setQuoteForm((prev) => ({ ...prev, [name]: newValue }));

    if (type !== "checkbox" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  useEffect(() => {
    const sqft = parseFloat(calcSqft(quoteForm.height, quoteForm.width));
    const totalSqft = parseFloat(calcTotalSqft(sqft, quoteForm.quantity));
    const amount = quoteForm.lumpsum
      ? parseFloat(quoteForm.ratePerSqft)
      : parseFloat(calcAmount(totalSqft, quoteForm.ratePerSqft));

    setQuoteForm((prev) => ({
      ...prev,
      sqft,
      totalSqft,
      amount,
    }));
  }, [
    quoteForm.height,
    quoteForm.width,
    quoteForm.quantity,
    quoteForm.ratePerSqft,
    quoteForm.lumpsum,
  ]);

  const handleAddItem = (e) => {
    e.preventDefault();

    const newErrors = {
      itemDescription: quoteForm.itemDescription.trim() === "",
      height: quoteForm.height.trim() === "",
      width: quoteForm.width.trim() === "",
      quantity: quoteForm.quantity <= 0,
      ratePerSqft: quoteForm.ratePerSqft <= 0,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    addItemToQuote({ ...quoteForm });

    setQuoteForm({
      itemDescription: "",
      height: "",
      width: "",
      quantity: 1,
      ratePerSqft: 0,
      sqft: 0,
      totalSqft: 0,
      amount: 0,
      lumpsum: false
    });
  };

  useEffect(() => {
    console.log("Updated quoteItems:", quoteItems);
  }, [quoteItems]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <QuoteForm
          form={quoteForm}
          onChange={handleChange}
          onAddItem={handleAddItem}
          resetForm={resetForm}
          errors={errors}
        />
      </div>
      <div className={styles.detailsSection}>
        <QuoteDetails items={quoteItems} />
      </div>
    </div>
  );
}

export default QuoteFormPage;
