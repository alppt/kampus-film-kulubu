import React from 'react';
import TVCard from './TVCard';

const TVList = ({ shows, onAddToWatchlist }) => {
  return (
    <div className="tv-list">
      {shows.map((item) => (
        <TVCard key={item.show.id} show={item.show} onAddToWatchlist={onAddToWatchlist} />
      ))}
    </div>
  );
};

export default TVList;