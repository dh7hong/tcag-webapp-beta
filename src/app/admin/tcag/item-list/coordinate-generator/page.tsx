"use client";
import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';

interface Coordinate {
  product: string;
  x: string;
  y: string;
}

const products = [
  "TS0001_tcag_top_t-shirt.png",
  "TS0002_tcag_top_sleeveless.png",
  "TS0003_tcag_top_dress-shirt.png",
  "TS0004_tcag_top_crew-neck.png",
  "TS0005_tcag_outer_hoodie.png",
  "TS0006_tcag_outer_cardigan.png",
  "TS0007_tcag_outer_denim-jacket.png",
  "TS0008_tcag_outer_blouson.png",
  "TS0009_tcag_outer_blazer.png",
  "TS0010_tcag_outer_wind-breaker.png",
  "TS0011_tcag_outer_trench-coat.png",
  "TS0012_tcag_bottom_shorts.png",
  "TS0013_tcag_bottom_jeans.png",
  "TS0014_tcag_bottom_sweat-pants.png",
  "TS0015_tcag_top_sports-bra.png",
  "TS0016_tcag_dress_mini-dress.png",
  "TS0017_tcag_bottom_leggings.png",
  "TS0018_tcag_hat_beanie.png",
  "TS0019_tcag_hat_ball-cap.png",
  "TS0020_tcag_hat_bucket-hat.png",
];

export default function CoordinateGenerator() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [csvData, setCsvData] = useState<Coordinate[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch('/assets/data/coordinates.csv')
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse<Coordinate>(text, { header: true });
        setCsvData(parsed.data);
      });
  }, []);

  const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!selectedProduct) return alert("Select a product first!");

    const rect = imgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      setCoords({ x: Number(x), y: Number(y) });

      const updatedData = [
        ...csvData.filter(item => item.product !== selectedProduct),
        { product: selectedProduct, x, y }
      ];

      setCsvData(updatedData);
      updateCSV(updatedData);
    }
  };

  const updateCSV = async (data: Coordinate[]) => {
    const response = await fetch('/api/update-coordinates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Coordinates successfully updated!');
    } else {
      alert('Failed to update coordinates.');
    }
  };

  return (
    <div className="min-h-screen p-4 text-white bg-gray-950">
      <select
        className="px-3 py-2 mb-4 bg-gray-800 rounded"
        onChange={(e) => setSelectedProduct(e.target.value)}
        value={selectedProduct}
      >
        <option value="">Select Product</option>
        {products.map(prod => (
          <option key={prod} value={prod}>{prod}</option>
        ))}
      </select>

      <img
        ref={imgRef}
        src="/assets/images/tcag/map/tcag_store-map.png"
        alt="Store Map"
        className="max-w-3xl cursor-crosshair"
        onClick={handleMapClick}
      />
      <div className="mt-2">
        Clicked Coordinates: X: {coords.x}%, Y: {coords.y}%
      </div>
    </div>
  );
}
