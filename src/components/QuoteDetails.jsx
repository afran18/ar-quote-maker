import React from "react";

function QuoteDetails({ customer, items }) {
  const totalAmount = items.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );
  return (
    <div className="quote-items">
      <h2>Customer Info</h2>
      <p>Name: {customer.name}</p>
      <p>Phone: {customer.phone}</p>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>

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
