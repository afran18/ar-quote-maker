import React from "react";
import styles from "./QuoteDetails.module.css";
import { useQuote } from "../context/useQuote";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotePdfDocument from "./QuotePdfDocument"; // Import the dummy PDF document

function QuoteDetails({ items }) {
  const { customer, quoteItems } = useQuote();
  const totalAmount = items.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  return (
    <div className={styles.quoteItems}>
      <div className={styles.quoteHeader}>
        <div className={styles.ownerDetails}>
          <div className={styles.ownerDetailsLeft}>
            <h2>AR Arts</h2>
          </div>
          <div className={styles.ownerDetailsRight}>
            <p>Mobile: +91 97316 16450</p>
            <p>Email: rdavalbhai@gmail.com</p>
          </div>
        </div>
        <div className={styles.customerDetailsTop}>
          {customer?.name && <p>Name: {customer.name}</p>}
          {customer?.date && <p>Date: {customer.date}</p>}
        </div>
        <div className={styles.phoneMailRow}>
          {customer?.phone && <p>Phone: {customer.phone}</p>}
          {customer?.email && <p>Email: {customer.email}</p>}
        </div>
        {customer?.address && <p>Address: {customer.address}</p>}
      </div>

      <div className={styles.contentWrapper}>
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
            {quoteItems.map((item, idx) => (
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
      </div>

      <footer className={styles.quoteFooter}>
        <div className={styles.signature}>
          <p>Signature</p>
          <div style={{ height: "30px" }}></div>
          <p>_________________</p>
        </div>

        <div className={styles.totalAmountWrapper}>
          <div className={styles.totalAmount}>
            Total Amount:{" "}
            {totalAmount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
            })}
          </div>
            {/* Button to print pdf*/}
          <PDFDownloadLink
            document={<QuotePdfDocument customer={customer} quoteItems={quoteItems} />} 
            fileName="quote.pdf" 
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <button className={styles.printBtn} disabled>Generating PDF...</button>
              ) : (
                <button className={styles.printBtn}>Download Quote</button>
              )
            }
          </PDFDownloadLink>
        </div>
      </footer>
    </div>
  );
}

export default QuoteDetails;
