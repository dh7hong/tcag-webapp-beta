// src/app/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TypingEffect from '@/components/TypingEffect';

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const requestBluetooth = async () => {
    if (navigator.bluetooth) {
      try {
        await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
        });
        console.log('Bluetooth permission granted.');
      } catch (error) {
        console.error('Bluetooth permission denied:', error);
      }
    } else {
      alert('Bluetooth is not supported in your browser.');
    }
  };

  const handleClick = () => {
    setFadeOut(true);
    requestBluetooth().finally(() => {
      setTimeout(() => {
        router.push('/login');
      }, 500);
    });
  };

  return (
    <main
      onClick={handleClick}
      className={`flex items-center justify-center min-h-screen bg-gray-950 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-sm p-6 bg-black shadow-xl cursor-pointer rounded-xl">
        <TypingEffect text="THE--SIM" />
        <p className="mt-4 text-center text-gray-400">(Tap anywhere to continue)</p>
      </div>
    </main>
  );
}
