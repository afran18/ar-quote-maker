import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewQuotesPage.module.css";
import axios from "axios";
import { useCustomer } from "../context/CustomerContext.jsx";
import CustomerActionModal from "../components/CustomerActionModal";
import { useQuote } from "../context/QuoteContext.jsx";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PAGE_SIZE = 5;

function ViewQuotesPage() {
  const navigate = useNavigate();
  const { updateCustomer, setCustomerId, setIsEditingCustomer } = useCustomer();
  const { quoteId, setQuoteId, quoteItems,setQuoteItems } = useQuote();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const [activeTab, setActiveTab] = useState("customers");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");

  const [customers, setCustomers] = useState([]);

  const [lastVisibleCustomerDocId, setLastVisibleCustomerDocId] =
    useState(null);
  const [customerPageHistory, setCustomerPageHistory] = useState([null]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [quotes, setQuotes] = useState([]);
  const [lastVisibleQuoteDocId, setLastVisibleQuoteDocId] = useState(null);
  const [quotePageHistory, setQuotePageHistory] = useState([null]);
  const [currentQuotePageIndex, setCurrentQuotePageIndex] = useState(0);

  const customerPageIndexRef = useRef(currentPageIndex);
  const customerPageHistoryRef = useRef(customerPageHistory);
  const quotePageIndexRef = useRef(currentQuotePageIndex);
  const quotePageHistoryRef = useRef(quotePageHistory);

  useEffect(() => {
    customerPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);

  useEffect(() => {
    customerPageHistoryRef.current = customerPageHistory;
  }, [customerPageHistory]);

  useEffect(() => {
    quotePageIndexRef.current = currentQuotePageIndex;
  }, [currentQuotePageIndex]);

  useEffect(() => {
    quotePageHistoryRef.current = quotePageHistory;
  }, [quotePageHistory]);

  const fetchCustomers = useCallback(async (direction = "initial") => {
    setLoading(true);
    setError(null);

    const currentHistory = customerPageHistoryRef.current;
    const currentIndex = customerPageIndexRef.current;

    let docIdToStartAfter;
    let newPageIndex;

    console.log(
      `fetchCustomers called. Direction: ${direction}, Current Index (before update): ${currentIndex}, History: `,
      currentHistory
    );

    if (direction === "next") {
      newPageIndex = currentIndex + 1;

      docIdToStartAfter = currentHistory[newPageIndex];
    } else if (direction === "previous") {
      newPageIndex = currentIndex - 1;

      docIdToStartAfter = currentHistory[newPageIndex];
    } else {
      newPageIndex = 0;
      docIdToStartAfter = null;
      setCustomerPageHistory([null]);
      setCurrentPageIndex(0);
    }

    let url = `${VITE_BACKEND_URL}/customer?limit=${PAGE_SIZE}`;
    if (docIdToStartAfter) {
      url += `&lastDocId=${docIdToStartAfter}`;
    }
    // if (submittedSearchQuery) {
    //   url += `&search=${encodeURIComponent(submittedSearchQuery)}`;
    // }

    try {
      const response = await axios.get(url);
      const { customers: fetchedCustomers, lastVisible: newLastVisibleId } =
        response.data;

      setCustomers(fetchedCustomers);

      setLastVisibleCustomerDocId(newLastVisibleId);

      setCustomerPageHistory((prev) => {
        if (newPageIndex >= prev.length - 1) {
          const newHistory = [...prev];
          newHistory[newPageIndex + 1] = newLastVisibleId;
          return newHistory;
        }
        return prev;
      });

      setCurrentPageIndex(newPageIndex);

      console.log(
        `fetchCustomers done. Fetched ${fetchedCustomers.length} customers. New Index: ${newPageIndex}, Last Visible ID of fetched page: ${newLastVisibleId}, Updated History: `,
        customerPageHistoryRef.current
      );
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again.");
      setCustomers([]);
      setLastVisibleCustomerDocId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQuotes = useCallback(async (direction = "initial") => {
    setLoading(true);
    setError(null);

    const currentHistory = quotePageHistoryRef.current;
    const currentIndex = quotePageIndexRef.current;

    let docIdToStartAfter;
    let newPageIndex;

    console.log(
      `fetchQuotes called. Direction: ${direction}, Current Index (before update): ${currentIndex}, History: `,
      currentHistory
    );

    if (direction === "next") {
      newPageIndex = currentIndex + 1;
      docIdToStartAfter = currentHistory[newPageIndex];
    } else if (direction === "previous") {
      newPageIndex = currentIndex - 1;
      docIdToStartAfter = currentHistory[newPageIndex];
    } else {
      newPageIndex = 0;
      docIdToStartAfter = null;
      setQuotePageHistory([null]);
      setCurrentQuotePageIndex(0);
    }

    let quotesUrl = `${VITE_BACKEND_URL}/quote/fetchQuotes?limit=${PAGE_SIZE}`;
    if (docIdToStartAfter) {
      quotesUrl += `&lastDocId=${docIdToStartAfter}`;
    }

    try {
      const quotesResponse = await axios.get(quotesUrl);
      const { quotes: fetchedQuotes, lastVisible: newLastVisibleId } =
        quotesResponse.data;

      const customerIds = [
        ...new Set(fetchedQuotes.map((quote) => quote.customerId)),
      ];

      const customerPromises = customerIds.map((id) =>
        axios.get(`${VITE_BACKEND_URL}/customer/${id}`)
      );
      const customerResponses = await Promise.all(customerPromises);

      const customerMap = new Map();
      customerResponses.forEach((res) => {
        const customer = res.data.customer;
        if (customer) {
          customerMap.set(customer.id, customer);
        }
      });

      const quotesWithCustomerDetails = fetchedQuotes.map((quote) => ({
        ...quote,
        customerName: customerMap.get(quote.customerId)?.name || "N/A",
        customerPhone: customerMap.get(quote.customerId)?.phone || "N/A",
      }));

      setQuotes(quotesWithCustomerDetails);
      setLastVisibleQuoteDocId(newLastVisibleId);

      setQuotePageHistory((prev) => {
        if (newPageIndex >= prev.length - 1) {
          const newHistory = [...prev];
          newHistory[newPageIndex + 1] = newLastVisibleId;
          return newHistory;
        }
        return prev;
      });

      setCurrentQuotePageIndex(newPageIndex);

      console.log(
        `fetchQuotes done. Fetched ${fetchedQuotes.length} quotes. New Index: ${newPageIndex}, Last Visible ID of fetched page: ${newLastVisibleId}, Updated History: `,
        quotePageHistoryRef.current
      );
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("Failed to load quotes. Please try again.");
      setQuotes([]);
      setLastVisibleQuoteDocId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "customers") {
      console.log("useEffect: activeTab customers, triggering initial fetch");
      fetchCustomers("initial");
    } else if (activeTab === "quotes") {
      console.log("useEffect: activeTab quotes, triggering initial fetch");
      fetchQuotes("initial");
    }
  }, [activeTab, fetchCustomers, fetchQuotes]);

  const handleCreateQuote = () => {
    navigate("/customer");
  };

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSearchSubmit = () => {

  //   setSubmittedSearchQuery(searchQuery);
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleSearchSubmit();
  //   }
  // };

  const handleNextPage = () => {
    console.log(`Clicked next in ${activeTab}`);
    if (loading) return;

    if (activeTab === "customers") {
      if (!lastVisibleCustomerDocId && customers.length < PAGE_SIZE) {
        console.log("No more customers to load for next page.");
        return;
      }
      fetchCustomers("next");
    } else if (activeTab === "quotes") {
      if (!lastVisibleQuoteDocId && quotes.length < PAGE_SIZE) {
        console.log("No more quotes to load for next page.");
        return;
      }
      fetchQuotes("next");
    }
  };

  const handlePreviousPage = () => {
    console.log(`Clicked prev in ${activeTab}`);
    if (loading) return;

    if (activeTab === "customers" && currentPageIndex > 0) {
      fetchCustomers("previous");
    } else if (activeTab === "quotes" && currentQuotePageIndex > 0) {
      fetchQuotes("previous");
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleQuoteClick = async (quote) => {
    const quoteResponse = await axios.get(
      `${VITE_BACKEND_URL}/quote/fetchQuotes/${quote.id}`
    );

    const fetchedQuote = quoteResponse.data.quote;
    setQuoteId(fetchedQuote.id);
    setQuoteItems(fetchedQuote.quoteItems);

    console.log("Selected Quote: ", fetchedQuote);
    console.log("Quote ID from context: ", quoteId);
    console.log("Quote context: ", quoteItems);

    const customerResponse = await axios.get(
      `${VITE_BACKEND_URL}/customer/${fetchedQuote.customerId}`
    );

    const fetchedCustomer = customerResponse.data.customer;

    console.log("Fetched Customer: ", fetchedCustomer);

    updateCustomer(fetchedCustomer);
    setCustomerId(fetchedCustomer.id)
    

    console.log("Customer from context: ", fetchedCustomer);

    navigate("/quote");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Saved Quotes & Customers</h2>
        <button className={styles.createBtn} onClick={handleCreateQuote}>
          + Create New Quote
        </button>
      </div>

      {/* <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by customer mobile or quote title..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        <button onClick={handleSearchSubmit} className={styles.searchButton}>
          Search
        </button>
      </div> */}

      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "customers" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("customers")}
          >
            Customers
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "quotes" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("quotes")}
          >
            Quotes
          </button>
        </div>

        <div className={styles.paginationControls}>
          <button
            onClick={handlePreviousPage}
            disabled={
              loading ||
              (activeTab === "customers" && currentPageIndex === 0) ||
              (activeTab === "quotes" && currentQuotePageIndex === 0)
            }
          >
            &larr; Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              loading ||
              (activeTab === "customers" &&
                !lastVisibleCustomerDocId &&
                customers.length < PAGE_SIZE) ||
              (activeTab === "quotes" &&
                !lastVisibleQuoteDocId &&
                quotes.length < PAGE_SIZE)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {activeTab === "customers" && (
          <div className={styles.listSection}>
            {loading && <p>Loading customers...</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            {!loading && !error && customers.length === 0 ? (
              <p>No customers found. Try adding some!</p>
            ) : (
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th className={styles.addressColumn}>Address</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr
                      key={customer.id}
                      onClick={() => handleCustomerClick(customer)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{currentPageIndex * PAGE_SIZE + index + 1}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td className={styles.addressColumn}>
                        <div className={styles.addressContent}>
                          {customer.address}
                        </div>
                      </td>
                      <td>
                        {customer.createdAt &&
                          new Date(
                            customer.createdAt._seconds * 1000
                          ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "quotes" && (
          <div className={styles.listSection}>
            {loading && <p>Loading quotes...</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            {!loading && !error && quotes.length === 0 ? (
              <p>No quotes found.</p>
            ) : (
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Customer Name</th>
                    <th>Mobile</th>
                    <th>Total Amount</th>
                    <th>Quote Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote, index) => (
                    <tr
                      key={quote.id}
                      onClick={() => handleQuoteClick(quote)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{currentQuotePageIndex * PAGE_SIZE + index + 1}</td>
                      <td>{quote.customerName}</td>
                      <td>{quote.customerPhone}</td>
                      <td>{quote.totalAmount}</td>
                      <td>
                        {quote.createdAt &&
                          new Date(
                            quote.createdAt._seconds * 1000
                          ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      {showModal && (
        <CustomerActionModal
          customer={selectedCustomer}
          onClose={() => setShowModal(false)}
          onEdit={() => {
            updateCustomer(selectedCustomer);
            setCustomerId(selectedCustomer.id);
            setIsEditingCustomer(true);
            setShowModal(false);
            navigate("/customer");
          }}
          onCreateQuote={() => {
            updateCustomer({
              ...selectedCustomer,
              date: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            });
            setCustomerId(selectedCustomer.id);
            setShowModal(false);
            navigate("/quote");
          }}
        />
      )}
    </div>
  );
}

export default ViewQuotesPage;
