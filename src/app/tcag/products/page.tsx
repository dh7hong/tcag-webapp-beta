// src/app/tcag/products/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import Image from 'next/image';

interface Coordinate {
  product: string;
  x: string;
  y: string;
}

const productImages = [
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

const capitalizeDashSeparated = (str: string) =>
  str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [coords, setCoords] = useState<Record<string, { x: number; y: number }>>({});
  const router = useRouter();

  useEffect(() => {
    fetch('/assets/data/coordinates.csv')
      .then(res => res.text())
      .then(csv => {
        const parsed = Papa.parse<Coordinate>(csv, { header: true });
        const coordData: Record<string, { x: number; y: number }> = {};
        parsed.data.forEach((row) => {
          if (row.product && row.x && row.y) {
            coordData[row.product.trim()] = {
              x: parseFloat(row.x),
              y: parseFloat(row.y),
            };
          }
        });
        setCoords(coordData);
      });
  }, []);

  const formattedProducts = productImages.map((fileName) => {
    const [, brand, category, product] = fileName.replace(".png", "").split("_");
    return { brand, category, product, fileName };
  });

  const categories = ["all", ...new Set(formattedProducts.map((item) => item.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? formattedProducts
      : formattedProducts.filter((item) => item.category === selectedCategory);

  const handleLocateItem = (fileName: string) => {
    const coord = coords[fileName];
    if (coord) {
      router.push(`/store-locator?x=${coord.x}&y=${coord.y}`);
    } else {
      alert("Coordinates not set for this item yet.");
    }
  };

  return (
    <main className="min-h-screen p-8 text-white bg-gray-950">
      <h1 className="mb-8 text-2xl font-semibold text-center">TCAG PRODUCTS</h1>

      <div className="mb-8 text-center">
        <Dropdown
          options={categories}
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
          placeholder="Select Category"
          width="200px"
        />
      </div>

      <div className="grid max-w-4xl grid-cols-2 gap-8 mx-auto">
        {filteredProducts.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center p-4 bg-gray-900 shadow-lg rounded-xl">
            <Image
              src={`/assets/images/tcag/products/${item.fileName}`}
              alt={item.product}
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="mt-4 space-y-1 text-center">
              <div className="text-sm font-bold uppercase">{item.brand}</div>
              <div className="text-sm uppercase">{item.category}</div>
              <div className="font-semibold">
                {capitalizeDashSeparated(item.product)}
              </div>
              <button
                className="px-3 py-1 mt-2 text-black bg-yellow-500 rounded"
                onClick={() => handleLocateItem(item.fileName)}
              >
                Locate Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}