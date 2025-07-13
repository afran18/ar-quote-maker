import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import QuoteDetails from "../components/QuoteDetails";
import QuoteForm from "../components/QuoteForm";
import { calcSqft, calcTotalSqft, calcAmount } from "../utils/calcUtils";

function QuoteFormPage() {
  const location = useLocation();
  const customer = location.state || {};

  const [quoteForm, setQuoteForm] = useState({
    itemDescription: "",
    height: "",
    width: "",
    quantity: 1,
    ratePerSqft: 0,
    sqft: 0,
    totalSqft: 0,
    amount: 0,
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const sqft = parseFloat(calcSqft(quoteForm.height, quoteForm.width));
    const totalSqft = parseFloat(calcTotalSqft(sqft, quoteForm.quantity));
    const amount = parseFloat(calcAmount(totalSqft, quoteForm.ratePerSqft));

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
  ]);

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([...items, quoteForm]);
    setQuoteForm({
      itemDescription: "",
      height: "",
      width: "",
      quantity: 1,
      ratePerSqft: "",
      sqft: "",
      totalSqft: "",
      amount: "",
    });
  };

  return (
    <>
      <div
        className="quotation-details"
        style={{ display: "flex", gap: "20px" }}
      >
        <QuoteForm
          form={quoteForm}
          onChange={handleChange}
          onAddItem={handleAddItem}
        />
        <QuoteDetails customer={customer} items={items} />
      </div>
    </>
  );
}
export default QuoteFormPage;
