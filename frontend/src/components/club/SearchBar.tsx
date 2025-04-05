interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="검색어를 입력해주세요."
      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black"
    />
  );
}
