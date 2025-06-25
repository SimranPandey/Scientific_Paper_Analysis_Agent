import React from "react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-sky-50 p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="🔎 Ask your scientific question..."
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
}
