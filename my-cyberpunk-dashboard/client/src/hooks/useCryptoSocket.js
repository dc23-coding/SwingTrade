import { useEffect } from 'react';

export default function useCryptoSocket(onUpdate) {
  useEffect(() => {
    const ws = new WebSocket('wss://your-crypto-feed-url');
    ws.onmessage = ({ data }) => {
      const tick = JSON.parse(data);
      onUpdate({ time: tick.time, value: tick.price });
    };
    return () => ws.close();
  }, [onUpdate]);
}