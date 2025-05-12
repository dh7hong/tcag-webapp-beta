// src/app/tcag/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/components/Dropdown';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Product {
  brandName: string;
  productId: string;
  category: string;
  gender: string;
  productName: string;
  productPrice: string;
  productImageUrl: string;
  xCoordinate?: number;
  yCoordinate?: number;
  floorNum?: number;
}

const capitalizeDashSeparated = (str: string) =>
  str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const formatPrice = (priceStr: string) => {
  const numericPart = parseInt(priceStr.replace('-krw', '').replace(/[^0-9]/g, ''), 10);
  return numericPart.toLocaleString('en-US') + ' KRW';
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data.products));
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleLocateItem = (item: Product) => {
    if (item.xCoordinate !== undefined && item.yCoordinate !== undefined) {
      router.push(`/store-item-locator?x=${item.xCoordinate}&y=${item.yCoordinate}`);
    } else {
      alert('Coordinates not set for this item yet.');
    }
  };

  return (
    <main className="min-h-screen p-8 text-white bg-gray-950">
      <h1 className="mb-8 text-2xl font-semibold text-center">TCAG PRODUCTS</h1>

      <div className="mb-8 text-center">
        <Dropdown
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select Category"
          width="200px"
        />
      </div>

      <div className="grid max-w-4xl grid-cols-2 gap-8 mx-auto">
        {filteredProducts.map((item) => (
          <div key={item.productId} className="flex flex-col items-center p-4 bg-gray-900 shadow-lg rounded-xl">
            <div className="m-4 text-xl font-bold uppercase">{item.brandName}</div>
            <Image
              src={item.productImageUrl}
              alt={item.productName}
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="mt-4 space-y-2 text-center">
              <div className="text-sm uppercase">{item.category}</div>
              <div className="font-semibold">{capitalizeDashSeparated(item.productName)}</div>
              <div className="text-sm font-bold uppercase">{formatPrice(item.productPrice)}</div>

              <button
                className="px-3 py-1 mt-2 text-black bg-yellow-500 rounded"
                onClick={() => handleLocateItem(item)}
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
