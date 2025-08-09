import React, { useState, memo } from "react";
import styles from "./QuoteDetails.module.css";
import { useCustomer } from "../context/CustomerContext.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { useResetQuote } from "../context/useResetQoute.js";
import { pdf } from "@react-pdf/renderer";
import QuotePdfDocument from "./QuotePdfDocument";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CustomModal = ({
  message,
  onConfirm,
  onCancel,
  showConfirm,
  showCancel,
}) => {
  if (!message) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          {showConfirm && (
            <button className={styles.modalConfirmBtn} onClick={onConfirm}>
              Yes
            </button>
          )}
          {showCancel && (
            <button className={styles.modalCancelBtn} onClick={onCancel}>
              No
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const QuoteDetails = memo(function QuoteDetails({
  onEditItem,
  onDeleteItem,
  disableDelete,
}) {
  const navigate = useNavigate();
  const { resetQuote } = useResetQuote();
  console.log("QuoteDetails is rendering");
  const { quoteItems, quoteId } = useQuote();
  const { customer, customerId } = useCustomer();

  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState({
    message: null,
    onConfirm: null,
    showConfirm: false,
    showCancel: false,
  });

  const totalAmount = quoteItems.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  const saveQuote = async () => {
    setIsSaving(true);

    const method = quoteId ? "PUT" : "POST";
    const url = quoteId
      ? `${VITE_BACKEND_URL}/quote/${quoteId}`
      : `${VITE_BACKEND_URL}/quote/addQuote`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteItems,
          totalAmount,
          customerId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Quote save failed", errorText);
        setModal({
          message: "Failed to save quote. Please try again.",
          onConfirm: () => setModal({ message: null }),
          showConfirm: true,
          showCancel: false,
        });
        return;
      }

      const data = await response.json();
      console.log("Saved quote with ID: ", data.quoteId);

      const blob = await pdf(
        <QuotePdfDocument customer={customer} quoteItems={quoteItems} />
      ).toBlob();

      const urlBlob = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = `Quote for ${customer.name}.pdf`;
      link.click();
      URL.revokeObjectURL(urlBlob);
      resetQuote();

      setModal({
        message: "Quote saved and PDF downloaded successfully!",
        onConfirm: () => setModal({ message: null }),
        showConfirm: true,
        showCancel: false,
      });
    } catch (error) {
      console.error("Error during saving PDF", error);
      setModal({
        message:
          "Unexpected error while saving and downloading PDF. Check console for details.",
        onConfirm: () => setModal({ message: null }),
        showConfirm: true,
        showCancel: false,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGeneratePdf = async () => {
    console.log("Generate PDF Called");

    if (quoteItems.length <= 0) {
      setModal({
        message: "No items in quote.",
        onConfirm: () => setModal({ message: null }),
        showConfirm: true,
        showCancel: false,
      });
      return;
    }

    if (!customerId) {
      setModal({
        message: "Customer is not added.",
        onConfirm: () => setModal({ message: null }),
        showConfirm: true,
        showCancel: false,
      });
      return;
    }

    setModal({
      message: "Do you want to save and download the PDF?",
      onConfirm: () => {
        setModal({ message: null });
        saveQuote();
        navigate("/view-quotes");
      },
      onCancel: () => setModal({ message: null }),
      showConfirm: true,
      showCancel: true,
    });
  };

  console.log("Save pdf calling");

  return (
    <div className={styles.quoteItems}>
      <CustomModal {...modal} />
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
                      onClick={() => onEditItem(item)}
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
        <button
          className={styles.printBtn}
          onClick={handleGeneratePdf}
          disabled={isSaving || disableDelete}
          title={
            isSaving || disableDelete
              ? "Finish editing item or wait for saving to finish"
              : ""
          }
          style={{
            cursor: isSaving || disableDelete ? "not-allowed" : "pointer",
          }}
        >
          {isSaving
            ? "Saving & Generating..."
            : quoteId
            ? "Update and Download Quote"
            : "Download Quote"}
        </button>
      </footer>
    </div>
  );
});

export default QuoteDetails;
