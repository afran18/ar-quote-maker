import { useNavigate } from "react-router-dom";
import styles from "./ViewQuotesPage.module.css";

function ViewQuotesPage() {
  const navigate = useNavigate();

  const quotes = [
    { id: 1, title: "Quote for Mr. Shah", date: "13 July 2025" },
    { id: 2, title: "Quote for Mrs. Mehta", date: "12 July 2025" },
    { id: 3, title: "Quote for Mr. Khan", date: "10 July 2025" },
    { id: 4, title: "Quote for Mr. Patel", date: "08 July 2025" },
    { id: 5, title: "Quote for Ms. Singh", date: "05 July 2025" },
  ];

  const handleCreateQuote = () => {
    navigate("/customer");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Saved Quotes</h2>
        <button className={styles.createBtn} onClick={handleCreateQuote}>
          + Create Quote
        </button>
      </div>

      <div className={styles.quoteList}>
        {quotes.map((quote) => (
          <div key={quote.id} className={styles.quoteCard}>
            <h3>{quote.title}</h3>
            <p>{quote.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewQuotesPage;
