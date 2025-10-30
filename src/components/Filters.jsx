import React from 'react';

const Filters = ({ filters, onFilterChange, onReset }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="filters-container">
      <button onClick={onReset} className="btn-reset">Sıfırla</button>
      <select name="genre" value={filters.genre} onChange={handleInputChange}>
        <option value="all">Tür (hepsi)</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Action">Action</option>
        <option value="Thriller">Thriller</option>
        <option value="Science-Fiction">Science-Fiction</option>
        <option value="Romance">Romance</option>
      </select>
      <select name="language" value={filters.language} onChange={handleInputChange}>
        <option value="all">Dil (hepsi)</option>
        <option value="English">English</option>
        <option value="Japanese">Japanese</option>
        <option value="Korean">Korean</option>
        <option value="Turkish">Turkish</option>
        <option value="Spanish">Spanish</option>
      </select>
      <select name="rating" value={filters.rating} onChange={handleInputChange}>
        <option value="0">Min. Puan (0+)</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
      </select>
    </div>
  );
};

export default Filters;