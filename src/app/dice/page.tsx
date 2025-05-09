// src/app/dice/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function DicePage() {
  const [dice, setDice] = useState(['die-1.svg', 'die-1.svg']);
  const [message, setMessage] = useState('');
  const [rolling, setRolling] = useState(false);
  const [rolled, setRolled] = useState(false);
  const router = useRouter();

  const rollDice = () => {
    setRolling(true);
    setMessage('');
    let rollCount = 0;
    let finalDice = [0, 0];

    const rollInterval = setInterval(() => {
      finalDice = [
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
      ];
      setDice([
        `die-${finalDice[0]}.svg`,
        `die-${finalDice[1]}.svg`,
      ]);

      rollCount += 1;
      if (rollCount >= 30) { // 0.1 sec interval for 3 seconds
        clearInterval(rollInterval);
        setRolling(false);
        setRolled(true);
        const total = finalDice[0] + finalDice[1];
        if (total === 7) {
          setMessage('🎉 You won a free t-shirt!');
        } else {
          setMessage(`You rolled a ${total}. Try again!`);
        }
      }
    }, 100);
  };

  useEffect(() => {
    setDice([
      `die-${Math.ceil(Math.random() * 6)}.svg`,
      `die-${Math.ceil(Math.random() * 6)}.svg`,
    ]);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-950">
      <div className="flex gap-8 mb-8">
        {dice.map((die, idx) => (
          <img
            key={idx}
            src={`/assets/dice/${die}`}
            alt={`Die ${idx + 1}`}
            className="w-32 h-32"
          />
        ))}
      </div>

      <Button onClick={rollDice} disabled={rolling || rolled}>
        {rolling ? 'Rolling...' : 'Roll a 7 for a Free T-Shirt!'}
      </Button>

      {message && (
        <p className="mt-4 text-lg font-semibold">{message}</p>
      )}

      {rolled && (
        <div className="mt-6">
          <Button onClick={() => router.push('/virtual-store-intro')}>
            Next
          </Button>
        </div>
      )}
    </main>
  );
}
