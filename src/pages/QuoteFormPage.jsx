// src/pages/QuoteFormPage.jsx

import React, { useState } from "react";
import QuoteDetails from "../components/QuoteDetails";
import QuoteForm from "../components/QuoteForm";
import styles from "./QuoteFormPage.module.css";
import { useQuote } from "../context/QuoteContext.jsx";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function QuoteFormPage() {
    console.log("QuoteFormPage is rendering");
    const {
        addItemToQuote,
        quoteItems,
        removeItemFromQuote,
        updateItemInQuote,
    } = useQuote();

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