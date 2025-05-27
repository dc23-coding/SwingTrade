import { Router } from 'express';
import axios from 'axios';

const router = Router();

// GET /api/price?symbol=BTC&interval=1d
router.get('/', async (req, res) => {
  const { symbol = 'BTC', interval = '1d' } = req.query;
  try {
    // example Coindesk OHLC endpoint – replace with your real provider
    const external = await axios.get(
      'https://api.coindesk.com/v1/ohlc',
      {
        params: {
          symbol,
          interval,
          api_key: process.env.COINDESK_API_KEY
        }
      }
    );
    // Map to lightweight-charts format
    const data = external.data.map(c => ({
      time: Math.floor(new Date(c.timestamp).getTime() / 1000),
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close
    }));
    res.json(data);
  } catch (err) {
    console.error('Price fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
});

export default router;
