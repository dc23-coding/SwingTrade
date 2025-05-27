// server/src/index.js
import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import dataRoutes from './routes/data.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
