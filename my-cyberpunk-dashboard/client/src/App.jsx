import React, { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import './styles.css';

const App = () => {
  const timeFrames = ['1m', '5m', '15m', '1h', '4h', '1d', '1w', '1M'];
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1d');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg border-b border-neon-green">
        <h1 className="text-2xl text-neon-green font-bold">CyberTrade</h1>
        <div className="flex space-x-2">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 ${
                selectedTimeFrame === tf ? 'bg-neon-blue' : 'bg-gray-700'
              } hover:bg-neon-blue text-white rounded`}
              onClick={() => setSelectedTimeFrame(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex space-x-4">
          <button className="text-neon-pink hover:underline">Login</button>
          <button className="text-neon-pink hover:underline">Signup</button>
        </div>
      </header>

      {/* Main Chart Area */}
      <main className="flex-grow p-4">
        <ChartComponent timeFrame={selectedTimeFrame} />
      </main>

      {/* Bottom Panel (Indicators) */}
      <footer className="p-4 bg-gray-800 border-t border-neon-green">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-neon-blue text-white rounded hover:bg-neon-blue-dark">
            Add SMA
          </button>
          <button className="px-4 py-2 bg-neon-purple text-white rounded hover:bg-neon-purple-dark">
            Add RSI
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
