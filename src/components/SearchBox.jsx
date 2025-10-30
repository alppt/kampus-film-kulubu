import React from 'react';

const SearchBox = ({ query, onSearch }) => {
  return (
    <input
      type="text"
      className="search-box"
      placeholder="Dizi ara... (örn: star, batman)"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;