import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const showResult = await axios(`https://api.tvmaze.com/shows/${id}`); // [cite: 27]
        const episodesResult = await axios(`https://api.tvmaze.com/shows/${id}/episodes`); // [cite: 28]
        setShow(showResult.data);
        setEpisodes(episodesResult.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="message">Yükleniyor...</p>;
  if (error) return <p className="message error">Detaylar yüklenirken bir hata oluştu.</p>;

  // HTML etiketlerini temizlemek için basit bir fonksiyon
  const stripHtml = (html) => {
     let tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  }

  return (
    <div className="show-detail-container">
      <Link to="/" className="back-link">← Geri</Link>
      {show && (
        <>
          <div className="detail-header">
            <img src={show.image?.original} alt={show.name}/>
            <div className="detail-info">
                <h1>{show.name}</h1>
                <p><strong>Tür:</strong> {show.genres?.join(', ')}</p>
                <p><strong>Dil:</strong> {show.language}</p>
                <p><strong>Puan:</strong> {show.rating?.average || 'N/A'}</p>
                <p><strong>Durum:</strong> {show.status}</p>
                <div className="summary-detail">{stripHtml(show.summary)}</div>
            </div>
          </div>

          <div className="episodes-section">
            <h2>Bölümler</h2>
            <ul className="episode-list">
              {episodes.map(episode => (
                <li key={episode.id}>
                  <span>S{episode.season.toString().padStart(2, '0')}E{episode.number.toString().padStart(2, '0')}: {episode.name}</span>
                  <span>{episode.airdate}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowDetail;