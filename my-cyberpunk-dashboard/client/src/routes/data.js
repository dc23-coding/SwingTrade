import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/ohlc', async (req, res) => {
  const { instrument, start, end, limit } = req.query;
  const apiKey = process.env.COINDESK_API_KEY;
  const url = `https://data-api.coindesk.com/spot/v1/historical/days`;
  const response = await axios.get(url, { params: { instrument, start, end, limit, api_key: apiKey } });
  res.json(response.data.data);
});

export default router;