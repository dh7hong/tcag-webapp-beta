// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export default function Button({ children, onClick, width, height, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ width, height }}
      className={`px-6 py-2 font-semibold transition rounded-lg ${
        disabled 
          ? 'opacity-50 cursor-not-allowed bg-gray-700 text-gray-300'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      {children}
    </button>
  );
}
