"use client";
import { useState, useRef } from 'react';

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('Map');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showCoords, setShowCoords] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setCoords({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(1)) });
      setShowCoords(true);
    }
  };

  const handleMouseLeave = () => {
    setShowCoords(false);
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen text-white bg-gray-950">
      <div className="relative flex flex-col items-center justify-center flex-grow p-4">
        {activeTab === 'Map' && (
          <>
            <img
              ref={imgRef}
              src="/assets/images/tcag/map/tcag_store-map.png"
              alt="Store Map"
              className="max-h-screen rounded shadow-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
            {showCoords && (
              <div className="px-3 py-1 mt-2 text-sm text-white bg-gray-800 rounded bg-opacity-70">
                X: {coords.x}%, Y: {coords.y}%
              </div>
            )}
          </>
        )}
        {activeTab === 'Product' && (
          <div>
            <h2 className="text-xl font-semibold">Products will be displayed here.</h2>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 flex justify-around w-full py-4 bg-gray-900">
        <button
          onClick={() => setActiveTab('Map')}
          className={`px-4 py-2 rounded ${activeTab === 'Map' ? 'bg-gray-700' : 'bg-gray-800'}`}
        >
          Map
        </button>
        <button
          onClick={() => setActiveTab('Product')}
          className={`px-4 py-2 rounded ${activeTab === 'Product' ? 'bg-gray-700' : 'bg-gray-800'}`}
        >
          Product
        </button>
      </div>
    </main>
  );
}
