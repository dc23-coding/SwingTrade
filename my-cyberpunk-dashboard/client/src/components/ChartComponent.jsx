// client/src/components/ChartComponent.jsx
import React, { useRef, useEffect } from 'react';
import {
  createChart,
  CandlestickSeries,        // ← import the series class
} from 'lightweight-charts';
import axios from 'axios';

const ChartComponent = ({ timeFrame }) => {
  const containerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    // 1) create the chart instance
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#000' },
        textColor: '#0f0',
      },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
    });
    chartRef.current = chart;

    // 2) add a candlestick series via the new API
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    seriesRef.current = candleSeries;

    // 3) fetch & render data
    axios
  .get(`${import.meta.env.VITE_API_URL}/api/price`, {
    params: { symbol: 'BTC', interval: timeFrame }
  })
  .then(res => {
    seriesRef.current.setData(res.data);
    chartRef.current.timeScale().fitContent();
  })
  .catch(err => console.error('❌ Chart fetch failed:', err));


    // 4) handle window resize
    const resizeHandler = () =>
      chart.applyOptions({ width: containerRef.current.clientWidth });
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      chart.remove();
    };
  }, [timeFrame]); // re-run when timeframe changes

  return (
    <div
      ref={containerRef}
      className="w-full bg-gray-900"
      style={{ minHeight: 400 }}
    />
  );
};

export default ChartComponent;
