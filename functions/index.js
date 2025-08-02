import functions from 'firebase-functions'; 
import admin from 'firebase-admin';       
import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv'; 

admin.initializeApp();

// Import your routes
import customerRoutes from './routes/customerRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';



const app = express();


app.use(cors({ origin: true }));
app.use(express.json()); 

// Routes
app.use('/customer', customerRoutes); 
app.use('/quote', quoteRoutes);       

// Health check 
app.get('/', (req, res) => {
    res.send('AR Quote Maker Backend (Cloud Function) is running...');
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

export const api = functions.https.onRequest(app);