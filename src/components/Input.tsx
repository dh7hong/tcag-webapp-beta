interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
}

export default function Input({ width, height, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{ width, height }}
      className="px-4 py-2 text-white placeholder-gray-400 transition bg-gray-800 border border-gray-700 rounded-lg focus:border-white"
    />
  );
}
