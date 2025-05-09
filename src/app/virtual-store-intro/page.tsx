"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TypingEffect from '@/components/TypingEffect';

export default function VirtualStoreIntro() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      router.push('/store');
    }, 500);
  };

  return (
    <main
      onClick={handleClick}
      className={`flex items-center justify-center min-h-screen bg-gray-950 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-sm p-6 bg-black shadow-xl cursor-pointer rounded-xl">
        <TypingEffect text="Welcome to TCAG's Virtual Store" />
        <p className="mt-4 text-center text-gray-400">(Tap anywhere to enter the store)</p>
      </div>
    </main>
  );
}
