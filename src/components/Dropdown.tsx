export default function Dropdown({ options, value, onChange }: { options: string[]; value: string; onChange: (val: string) => void }) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }