import { getDb, getFieldValue } from "../config/firebase.js";
import { FieldPath } from 'firebase-admin/firestore';

export const addQuote = async (req, res) => {
  try {
    const { quoteItems, totalAmount, customerId } = req.body;

    if (!quoteItems || !Array.isArray(quoteItems) || quoteItems.length === 0) {
      return res.status(400).json({ message: "Quote items are required" });
    }

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const newQuote = {
      quoteItems,
      totalAmount,
      customerId,
      createdAt: new Date(),
    };

    const db = getDb();
    const FieldValue = getFieldValue();

    // Fetching customer:
    const customerRef = db.collection("customers").doc(customerId);
    // Fetching customer document
    const customerDoc = await customerRef.get();

    if (!customerDoc.exists) {
      return res
        .status(404)
        .json({ message: `No customer found with id: ${customerId}` });
    }

    // Adding quote in Firestore
    const quoteRef = await db.collection("quotes").add(newQuote);

    // Add quote to customer's quote array
    await customerRef.update({
      quotes: FieldValue.arrayUnion(quoteRef.id),
    });

    return res.status(201).json({
      message: "Quote added successfully",
      quoteId: quoteRef.id,
    });
  } catch (error) {
    console.error("Error adding quote", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const fetchQuotesPaginate = async (req, res) => {
  try {
    const db = getDb();
    const { limit = 5, lastDocId } = req.query;
    const parsedLimit = parseInt(limit);

    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ message: "Invalid limit provided" });
    }

    let query = db.collection("quotes");

    query = query.orderBy("createdAt", "desc");

    if (lastDocId) {
      const lastDocSnapshot = await db
        .collection("quotes")
        .doc(lastDocId)
        .get();

      if (!lastDocSnapshot.exists) {
        return res.status(404).json({ message: "lastDocId not found." });
      }
      query = query.startAfter(lastDocSnapshot);
    }
    query = query.limit(parsedLimit);

    const snapshot = await query.get();

    const quotes = [];
    snapshot.forEach((doc) => {
      quotes.push({ id: doc.id, ...doc.data() });
    });

    let lastVisible = null;
    if (snapshot.docs.length > 0) {
      lastVisible = snapshot.docs[snapshot.docs.length - 1].id;
    }

    if (quotes.length < parsedLimit) {
      lastVisible = null;
    }

    return res.status(200).json({ quotes, lastVisible });
  } catch (error) {
    console.error("Error fetching quotes: ", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};


export const getQuotesByCustomerIdPaginate = async (req, res) => {
  try {
    const { customerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; 

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required." });
    }

    const db = getDb();
    

    const customerRef = db.collection("customers").doc(customerId);
    const customerDoc = await customerRef.get();

    if (!customerDoc.exists) {
      return res.status(404).json({ message: "Customer not found." });
    }

    const customerData = customerDoc.data();
    const quoteIds = customerData.quotes || [];

    const quotesInReverse = [...quoteIds].reverse();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedQuoteIds = quotesInReverse.slice(startIndex, endIndex);

    if (paginatedQuoteIds.length === 0) {
      return res.status(200).json({
        quotes: [],
        totalQuotes: quoteIds.length,
        message: "No quotes found for this customer on this page.",
      });
    }

  
    const quotesRef = db.collection("quotes");
    const snapshot = await quotesRef.where(FieldPath.documentId(), 'in', paginatedQuoteIds).get();

    const quotes = [];
    snapshot.forEach((doc) => {
      quotes.push({ id: doc.id, ...doc.data() });
    });
    
    const sortedQuotes = paginatedQuoteIds.map(id => quotes.find(q => q.id === id)).filter(q => q);

    return res.status(200).json({
      quotes: sortedQuotes,
      totalQuotes: quoteIds.length,
      currentPage: page,
      pageSize: limit,
      message: "Quotes fetched successfully.",
    });

  } catch (error) {
    console.error("Error fetching quotes by customer ID from array:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};