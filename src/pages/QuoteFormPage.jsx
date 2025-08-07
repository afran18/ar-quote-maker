import React, { useState } from "react";
import QuoteDetails from "../components/QuoteDetails";
import QuoteForm from "../components/QuoteForm";
import styles from "./QuoteFormPage.module.css";
import { useQuote } from "../context/QuoteContext.jsx";

function QuoteFormPage() {
  console.log("QuoteFormPage is rendering");
  const { addItemToQuote, quoteItems, removeItemFromQuote, updateItemInQuote } =
    useQuote();

  const [editingItem, setEditingItem] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <QuoteForm
          onAddItem={addItemToQuote}
          onUpdateItem={updateItemInQuote}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
      </div>
      {/* <div className={styles.detailsSection}>
        <QuoteDetails
          items={quoteItems}
          onEditItem={(item) => {
            setQuoteForm(item);
            setEditingItem(item.id);
          }}
          onDeleteItem={removeItemFromQuote}
          disableDelete={!!editingItem}
        />
      </div> */}

      <div className={styles.detailsSection}>
        <QuoteDetails
          items={quoteItems}
          onEditItem={(item) => setEditingItem(item)}
          onDeleteItem={removeItemFromQuote}
          disableDelete={!!editingItem}
        />
      </div>
    </div>
  );
}

export default QuoteFormPage;
