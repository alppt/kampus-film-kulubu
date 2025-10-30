import React from 'react';

const WatchlistPanel = ({ watchlist, onRemove, onClear }) => {
  return (
    <div className="watchlist-panel">
      <h4>Gösterime Girecekler ({watchlist.length})</h4>
      {watchlist.length === 0 ? (
        <p>Listeye ekleme yapın.</p>
      ) : (
        <>
          <ul className="watchlist-items">
            {watchlist.map(item => (
              <li key={item.show.id}>
                <img src={item.show.image?.medium} alt={item.show.name}/>
                <span>{item.show.name}</span>
                <button onClick={() => onRemove(item.show.id)} className="btn-remove">Kaldır</button>
              </li>
            ))}
          </ul>
          <button onClick={onClear} className="btn-clear">Listeyi Temizle</button>
        </>
      )}
    </div>
  );
};

export default WatchlistPanel;