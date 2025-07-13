import CustomInput from "./CustomInput";

function QuoteForm({ form, onChange, onAddItem }) {
  return (
    <form onSubmit={onAddItem}>
      <CustomInput
        label="Item Description"
        type="text"
        name="itemDescription"
        id="itemDescription"
        value={form.itemDescription}
        onChange={onChange}
      />
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

      <div>
        <h3>SqFt per Item: {Number(form.sqft).toFixed(2)}</h3>
        <h3>Total SqFt: {Number(form.totalSqft).toFixed(2)}</h3>
        <h3>Amount: {Number(form.amount).toFixed(2)}</h3>
      </div>

      <button type="reset">Reset</button>
      <button type="submit">Add Item</button>
    </form>
  );
}
export default QuoteForm;
