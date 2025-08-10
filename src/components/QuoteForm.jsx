import { useState, useEffect, useMemo } from "react";
import CustomInput from "./CustomInput";
import styles from "./QuoteForm.module.css";
import { calcSqft, calcTotalSqft, calcAmount } from "../utils/calcUtils.js";

function QuoteForm({ onAddItem, onUpdateItem, editingItem, setEditingItem }) {
  // const { quoteItems } = useQuote();

  const initialForm = {
    itemDescription: "",
    height: "",
    width: "",
    quantity: 1,
    ratePerSqft: 0,
    // sqft: 0,
    // totalSqft: 0,
    // amount: 0,
    lumpsum: false,
  };

  const [quoteForm, setQuoteForm] = useState(initialForm);

  const sqft = useMemo(
    () => parseFloat(calcSqft(quoteForm.height, quoteForm.width)),
    [quoteForm.height, quoteForm.width]
  );
  const totalSqft = useMemo(
    () => parseFloat(calcTotalSqft(sqft, quoteForm.quantity)),
    [sqft, quoteForm.quantity]
  );
  const amount = useMemo(
    () =>
      quoteForm.lumpsum
        ? parseFloat(quoteForm.ratePerSqft)
        : parseFloat(calcAmount(totalSqft, quoteForm.ratePerSqft)),
    [quoteForm.ratePerSqft, quoteForm.lumpsum, totalSqft]
  );

  const [errors, setErrors] = useState({
    itemDescription: false,
    height: false,
    width: false,
    quantity: false,
    ratePerSqft: false,
  });

  const isEditing = !!editingItem;

  useEffect(() => {
    if (editingItem) {
      setQuoteForm(editingItem);
    }
  }, [editingItem]);

  const resetForm = () => {
    setQuoteForm(initialForm);
    setErrors({
      itemDescription: false,
      height: false,
      width: false,
      quantity: false,
      ratePerSqft: false,
    });
  };

  // useEffect(() => {
  //   setQuoteForm((prev) => ({
  //     ...prev,
  //     sqft,
  //     totalSqft,
  //     amount,
  //   }));
  // }, [
  //   quoteForm.height,
  //   quoteForm.width,
  //   quoteForm.quantity,
  //   quoteForm.ratePerSqft,
  //   quoteForm.lumpsum,
  // ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setQuoteForm((prev) => ({ ...prev, [name]: newValue }));

    if (type !== "checkbox" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
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

    if (isEditing) {
      onUpdateItem(quoteForm);
      setEditingItem(null);
    } else {
      onAddItem({ ...quoteForm, sqft, totalSqft, amount });
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.quoteForm}>
      <div className={styles.formItem}>
        <CustomInput
          label="Item Description"
          type="text"
          name="itemDescription"
          id="itemDescription"
          value={quoteForm.itemDescription}
          onChange={handleChange}
          className={styles.form}
          error={errors.itemDescription}
        />
      </div>

      <div className={styles.formItemGroup}>
        <CustomInput
          label="Height"
          type="number"
          name="height"
          id="height"
          value={quoteForm.height}
          onChange={handleChange}
          error={errors.height}
        />
        <CustomInput
          label="Width"
          type="number"
          name="width"
          id="width"
          value={quoteForm.width}
          onChange={handleChange}
          error={errors.width}
        />
      </div>
      <div className={styles.formItemGroup}>
        <CustomInput
          label="Quantity"
          type="number"
          name="quantity"
          id="quantity"
          value={quoteForm.quantity}
          onChange={handleChange}
          error={errors.quantity}
        />
        <CustomInput
          label="Rate per sqft"
          type="number"
          name="ratePerSqft"
          id="ratePerSqft"
          value={quoteForm.ratePerSqft}
          onChange={handleChange}
          error={errors.ratePerSqft}
        />
      </div>

      <div className={styles.calculationRow}>
        <div className={styles.calculationItem}>
          <h3>SqFt per Item:</h3>
          <h3>{Number(sqft).toFixed(2)}</h3>
        </div>
        <div className={styles.calculationItem}>
          <h3>Total SqFt</h3>
          <h3>{Number(totalSqft).toFixed(2)}</h3>
        </div>
        <div className={styles.calculationItem}>
          <h3>Amount</h3>
          <h3> {Number(amount).toFixed(2)}</h3>
        </div>
        <div className={styles.calculationItem}>
          <h3>Lumpsum Amount</h3>
          <input
            type="checkbox"
            name="lumpsum"
            id="lumpsum"
            checked={quoteForm.lumpsum}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="reset"
          className={styles.buttonReset}
          onClick={resetForm}
          disabled={isEditing}
          style={{
            cursor: isEditing ? "not-allowed" : "pointer",
          }}
        >
          Reset
        </button>
        <button type="submit" className={styles.buttonSubmit}>
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
}
export default QuoteForm;
