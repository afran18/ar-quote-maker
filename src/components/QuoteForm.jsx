import CustomInput from "./CustomInput";
import styles from "./QuoteForm.module.css";

function QuoteForm({ form, onChange, onAddItem, customer }) {
  return (
    <form onSubmit={onAddItem} className={styles.quoteForm}>
      <div className={styles.formItem}>
        <CustomInput
          label="Item Description"
          type="text"
          name="itemDescription"
          id="itemDescription"
          value={form.itemDescription}
          onChange={onChange}
          className={styles.form}
        />
      </div>

      <div className={styles.formItemGroup}>
        <CustomInput
          label="Height"
          type="number"
          name="height"
          id="height"
          value={form.height}
          onChange={onChange}
        />
        <CustomInput
          label="Width"
          type="number"
          name="width"
          id="width"
          value={form.width}
          onChange={onChange}
        />
      </div>
      <div className={styles.formItemGroup}>
        <CustomInput
          label="Quantity"
          type="number"
          name="quantity"
          id="quantity"
          value={form.quantity}
          onChange={onChange}
        />
        <CustomInput
          label="Rate per sqft"
          type="number"
          name="ratePerSqft"
          id="ratePerSqft"
          value={form.ratePerSqft}
          onChange={onChange}
        />
      </div>

      <div className={styles.calculationRow}>
        <div className={styles.calculationItem}>
          <h3>SqFt per Item:</h3>
          <h3>{Number(form.sqft).toFixed(2)}</h3>
        </div>
        <div className={styles.calculationItem}>
          <h3>Total SqFt</h3>
          <h3>{Number(form.totalSqft).toFixed(2)}</h3>
        </div>
        <div className={styles.calculationItem}>
          <h3>Amount</h3>
          <h3> {Number(form.amount).toFixed(2)}</h3>
        </div>
      </div>
      <div className={styles.dateAndButtonsRow}>
        <h3>
          Date: {customer.date || "N/A"}
        </h3>
        <div className={styles.buttonGroup}>
          <button type="reset" className={styles.buttonReset}>
            Reset
          </button>
          <button type="submit" className={styles.buttonSubmit}>
            Add Item
          </button>
        </div>
      </div>
    </form>
  );
}
export default QuoteForm;
