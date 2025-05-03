// src/components/Dropdown.tsx
import React from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  placeholder?: string;
  width?: string;
  height?: string;
  onChange: (_val: string) => void;
}

export default function Dropdown({
  options,
  value,
  placeholder,
  width,
  height,
  onChange,
}: DropdownProps) {
  const isPlaceholderSelected = value === '';

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width, height }}
      className={`px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg ${
        isPlaceholderSelected ? 'text-gray-400' : 'text-white'
      }`}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
