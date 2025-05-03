// Stylish Black/White Button
export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
      <button
        onClick={onClick}
        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
      >
        {children}
      </button>
    );
  }