import React from "react";
import styles from "./CustomerActionModal.module.css";

function CustomerActionModal({ customer, onClose, onEdit, onCreateQuote }) {
  if (!customer) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>What would you like to do?</h3>
        <p><strong>{customer.name}</strong></p>

        <div className={styles.modalButtons}>
          <button className={styles.modalEditBtn} onClick={onEdit}>
            Edit Customer
          </button>
          <button className={styles.modalCreateBtn} onClick={onCreateQuote}>
            + Create Quote
          </button>
          <button className={styles.modalClose} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerActionModal;
