"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function StoreLocatorPage() {
  const params = useSearchParams();
  const router = useRouter();
  const x = parseFloat(params.get('x') || '0');
  const y = parseFloat(params.get('y') || '0');
  const imgRef = useRef<HTMLImageElement>(null);
  const [markerPos, setMarkerPos] = useState({ left: '0%', top: '0%' });

  useEffect(() => {
    if (imgRef.current && x && y) {
      setMarkerPos({
        left: `${x}%`,
        top: `${y}%`
      });
    }
  }, [x, y]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <button
        onClick={() => router.back()}
        className="absolute px-4 py-2 text-white bg-gray-700 rounded top-4 left-4 hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="relative max-w-3xl">
        <img
          ref={imgRef}
          src="/assets/images/tcag/map/tcag_store-map.png"
          alt="Store Map"
          className="rounded shadow-lg"
        />
        {x && y && (
          <div
            className="absolute w-8 h-8 bg-yellow-400 rounded-full opacity-50 pointer-events-none"
            style={{
              left: markerPos.left,
              top: markerPos.top,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>
    </main>
  );
}