import React from "react";
import styles from "./QuoteDetails.module.css";
import { useQuote } from "../context/useQuote";
import { pdf } from "@react-pdf/renderer";
import QuotePdfDocument from "./QuotePdfDocument";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function QuoteDetails({ onEditItem, onDeleteItem, disableDelete }) {
  const { customer, quoteItems } = useQuote();
  const totalAmount = quoteItems.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  const handleGeneratePdf = async () => {
    if (quoteItems.length <= 0) {
      alert("No items in quote");
      return;
    } else if (window.confirm("Do you want to save and download the PDF?")) {
      console.log("Printing pdf");

      const blob = await pdf(
        <QuotePdfDocument customer={customer} quoteItems={quoteItems} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "quote.pdf";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quoteItems.length > 0 &&
              quoteItems.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.itemDescription}</td>
                  <td>{item.height || "-"}</td>
                  <td>{item.width || "-"}</td>
                  <td>{item.quantity || 1}</td>
                  <td>{item.totalSqft}</td>
                  <td>
                    {parseFloat(item.amount || 0).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <button
                      className={styles.iconBtn}
                      style={{ backgroundColor: "#28a745" }}
                      // style={{
                      //   backgroundColor: disableDelete ? "#a9a9a9" : "#28a745",
                      //   cursor: disableDelete ? "not-allowed" : "pointer",
                      // }}
                      onClick={() => onEditItem(item)}
                      // disabled={disableDelete}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className={styles.iconBtn}
                      style={{
                        backgroundColor: disableDelete ? "#a9a9a9" : "#dc3545",
                        cursor: disableDelete ? "not-allowed" : "pointer",
                      }}
                      onClick={() => onDeleteItem(item.id)}
                      disabled={disableDelete}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))}

            {quoteItems.length === 0 && (
              <tr>
                <td colSpan="8" className={styles.noItemsRow}>
                  No Items Added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.quoteFooter}>
        <div className={styles.totalAmount}>
          Total Amount:{" "}
          {totalAmount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          })}
        </div>
        {/* Button to print pdf*/}
        {/* <PDFDownloadLink
            document={
              <QuotePdfDocument customer={customer} quoteItems={quoteItems} />
            }
            fileName="quote.pdf"
          >
            {({ loading }) =>
              loading ? (
                <button className={styles.printBtn} disabled>
                  Generating PDF...
                </button>
              ) : (
                <button className={styles.printBtn}>Download Quote</button>
              )
            }
          </PDFDownloadLink> */}

        <button
          className={styles.printBtn}
          onClick={handleGeneratePdf}
          disabled={disableDelete}
          title={disableDelete ? "Finish editng item first" : ""}
          style={{
            cursor: disableDelete ? "not-allowed" : "pointer",
          }}
        >
          Download Quote
        </button>
      </footer>
    </div>
  );
}

export default QuoteDetails;
