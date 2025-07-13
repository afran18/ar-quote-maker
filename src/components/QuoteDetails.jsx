import React from "react";

function QuoteDetails({ customer, items }) {
  const totalAmount = items.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );
  return (
    <div className="quote-items">
      <h2>Customer Info</h2>
      <p>Name: {customer.customerName}</p>
      <p>Phone: {customer.customerPhone}</p>
      <p>Email: {customer.customerEmail}</p>
      <p>Address: {customer.customerAddress}</p>

      <h2>Items</h2>
      {items.map((item, idx) => (
        <div key={idx} className="item-card">
          <p>
            <strong>{item.itemDescription}</strong>
          </p>
          <p>
            {item.quantity} x {item.height} x {item.width} ft
          </p>
          <p>Total SqFt: {item.totalSqft}</p>
          <p>Amount: {item.amount}</p>
          <hr />
        </div>
      ))}
      <div
        style={{ fontWeight: "bold", fontSize: "1.2rem", marginTop: "10px" }}
      >
        Total Amount:{" "}
        {totalAmount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}

export default QuoteDetails;
