// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
}

export default function Button({ children, onClick, width, height }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ width, height }}
      className="px-6 py-2 font-semibold text-black transition bg-white rounded-lg hover:bg-gray-200"
    >
      {children}
    </button>
  );
}
