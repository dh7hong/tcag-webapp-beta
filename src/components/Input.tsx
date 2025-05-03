export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <input
        {...props}
        className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-white transition"
      />
    );
  }