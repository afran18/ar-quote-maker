import { db } from '../config/firebase.js';

export const getAllQuotes = async (req, res) => {
    try {
        const snapshot = await db.collection('quotes').get();
        const quotes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({error : "Failed to fetch quotes"})
    }
}


export const addQuote = async (req, res) => {
    try {
        const newQuote = req.body;
        const docRef = await db.collection('quotes').add(newQuote);
        res.status(201).json({id: docRef.id, ...newQuote});
    } catch (error) {
    res.status(500).json({ error: 'Failed to add quote' });
  }
}

export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('quotes').doc(id).delete();
    res.status(200).json({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quote' });
  }
};