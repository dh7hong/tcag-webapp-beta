// src/app/store/page.tsx
"use client";
import { useState } from 'react';

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('Map');

  return (
    <main className="flex flex-col items-center justify-between min-h-screen text-white bg-gray-950">
      <div className="flex items-center justify-center flex-grow p-4">
        {activeTab === 'Map' && (
          <img
            src="/assets/images/tcag/map/tcag_store-map.png"
            alt="Store Map"
            className="max-h-screen rounded shadow-lg"
          />
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
