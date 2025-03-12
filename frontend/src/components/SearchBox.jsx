import React, { useState } from "react";

const SearchBox = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="w-full max-w-md p-2 border rounded-lg flex items-center bg-white shadow-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBox;