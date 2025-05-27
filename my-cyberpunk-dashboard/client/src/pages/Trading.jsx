import React, { useState, useEffect } from 'react';
import { getHistoricalDays } from '../api/coinDesk';
import BtcChart from '../components/BtcChart';

export default function Trading() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const now = Math.floor(Date.now() / 1000);
      const oneDay = 24 * 60 * 60;
      const ohlc = await getHistoricalDays('BTC-USD', now - 30 * oneDay, now, 30);
      setData(ohlc);
    })();
  }, []);

  return <BtcChart data={data} />;
}