// server/src/routes/data.js
import { Router } from 'express';
import axios from 'axios';

const router = Router();

// GET /api/price?symbol=BTC&interval=1d
router.get('/price', async (req, res) => {
  const symbol   = req.query.symbol   || 'BTC';
  const interval = req.query.interval || '1d';
  const key      = process.env.COINDESK_API_KEY; // set this in server/.env

  try {
    const { data } = await axios.get(
      'https://api.coindesk.com/v1/ohlc',
      { params: { symbol, interval, api_key: key } }
    );
    const formatted = data.map(c => ({
      time:  Math.floor(new Date(c.timestamp).getTime() / 1000),
      open:  c.open, high: c.high, low: c.low, close: c.close
    }));
    return res.json(formatted);
  } catch (err) {
    console.error('❌ /api/price error:', err.message);
    return res.status(502).json({ error: 'Failed to fetch price data' });
  }
});

export default router;
