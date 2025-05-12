// src/app/store-locator/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, Suspense } from 'react';
import Link from 'next/link';

function StoreLocatorComponent() {
  const params = useSearchParams();
  const x = parseFloat(params.get('x') || '0');
  const y = parseFloat(params.get('y') || '0');
  const imgRef = useRef<HTMLDivElement>(null);
  const [markerPos, setMarkerPos] = useState({ left: '0%', top: '0%' });

  useEffect(() => {
    setMarkerPos({ left: `${x}%`, top: `${y}%` });
  }, [x, y]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <Link href="/tcag/products" className="absolute px-3 py-1 text-white bg-gray-800 rounded top-4 left-4">
        ← Back to Products
      </Link>

      <div ref={imgRef} className="relative inline-block max-w-3xl">
        <img
          src="/assets/images/tcag/map/tcag_store-map.png"
          alt="Store Map"
          className="rounded shadow-lg"
        />

        <div
          className="absolute bg-yellow-400 bg-opacity-50 rounded-full pointer-events-none animate-pulse"
          style={{
            left: markerPos.left,
            top: markerPos.top,
            width: '30px',
            height: '30px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </main>
  );
}

export default function StoreLocatorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white bg-gray-950">Loading...</div>}>
      <StoreLocatorComponent />
    </Suspense>
  );
}