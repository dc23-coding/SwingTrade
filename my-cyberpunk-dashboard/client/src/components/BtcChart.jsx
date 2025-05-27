import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const BtcChart = ({ interval }) => {
  const containerRef = useRef();
  const chartRef = useRef();
  const candleSeriesRef = useRef();

  // 1. Initialize chart once
  useEffect(() => {
    chartRef.current = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: '#000' },
        textColor: '#0f0'
      },
      grid: {
        vertLines: { color: '#222' },
        horzLines: { color: '#222' }
      }
    });
    candleSeriesRef.current = chartRef.current.addCandlestickSeries();
  }, []);

  // 2. Re-fetch and render data whenever `interval` changes
  useEffect(() => {
    if (!interval) return;
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/price`,
        { params: { symbol: 'BTC', interval } }
      );
      // expects [{ time: 1626604800, open, high, low, close }, …]
      candleSeriesRef.current.setData(res.data);
      chartRef.current.timeScale().fitContent();
    })();
  }, [interval]);

  return (
    <div
      ref={containerRef}
      className="w-full border border-gray-700"
      style={{ minHeight: '300px' }}
    />
  );
};

export default BtcChart;
