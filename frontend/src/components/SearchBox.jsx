import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchBox.css";
import { useNavigate } from "react-router";
const SearchBox = ({ placeholder = "Search courses"}) => {
  const [query, setQuery] = useState("");
   const navigate=useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission (Enter key or button click)
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/browse-courses", { state: { searchQuery: query } });
  };

  // Clear search input
  const clearSearch = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <div className="search-box">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-input"
        />

        {/* Clear Button (only visible when there's text) */}
        {query && (
          <button type="button" onClick={clearSearch} className="clear-btn">
            <FaTimes size={18} />
          </button>
        )}

        {/* Search Button (Clickable & Submittable) */}
        <button type="submit" className="search-btn">
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;

