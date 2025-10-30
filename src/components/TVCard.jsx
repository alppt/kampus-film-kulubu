import React from 'react';
import { Link } from 'react-router-dom';

const TVCard = ({ show, onAddToWatchlist }) => {
  const imageUrl = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=Poster+Yok';
  const rating = show.rating.average || 'N/A';
  const genres = show.genres.join(', ');
  const language = show.language;

  // HTML etiketlerini temizlemek için basit bir fonksiyon
  const stripHtml = (html) => {
     let tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  }
  
  const summary = stripHtml(show.summary || 'Özet bulunamadı.').substring(0, 100) + '...';


  return (
    <div className="tv-card">
      <img src={imageUrl} alt={show.name} />
      <div className="tv-card-info">
        <h3>{show.name}</h3>
        <p>
          <span className="tag">{language}</span>
          <span className="tag">{genres}</span>
          <span className="tag rating">⭐ {rating}</span>
        </p>
        <p className="summary">{summary}</p>
        <div className="card-buttons">
          <Link to={`/show/${show.id}`} className="btn btn-detail">Detay</Link>
          <button onClick={() => onAddToWatchlist({ show })} className="btn btn-add">Gösterime Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;