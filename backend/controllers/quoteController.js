import { db, FieldValue } from "../config/firebase.js";

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
