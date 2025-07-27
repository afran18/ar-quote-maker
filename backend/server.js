import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import quoteRoutes from './routes/quoteRoutes.js';

dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/quotes', quoteRoutes);

app.get('/',(req, res) => {
    res.send('AR Quote Maker Backend is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})