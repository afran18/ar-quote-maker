import React from "react";
import styles from "./QuoteDetails.module.css";

function QuoteDetails({ customer, items }) {
  const totalAmount = items.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  console.log(customer);

  return (
    <div className={styles.quoteItems}>
      <div className={styles.quoteHeader}>
          <h2>AR Arts</h2>
        <div className={styles.customerDetailsTop}>
          <p>Name: {customer.customerName}</p>
          <p>Date: {customer.date}</p>
        </div>
        <div className={styles.phoneMailRow}>
          <p>Phone: {customer.customerPhone}</p>
          <p>Email: {customer.customerEmail}</p>
        </div>
        <p>Address: {customer.customerAddress}</p>
      </div>

      <table className={styles.quoteTable}>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Description</th>
            <th>Height (ft)</th>
            <th>Width (ft)</th>
            <th>Qty</th>
            <th>SqFt</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.itemDescription}</td>
              <td>{item.height}</td>
              <td>{item.width}</td>
              <td>{item.quantity}</td>
              <td>{item.totalSqft}</td>
              <td>
                {parseFloat(item.amount || 0).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.totalAmount}>
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
