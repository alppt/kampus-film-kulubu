import React, { useReducer, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { tvShowReducer, initialState, actions, initialFilters } from '../reducers/tvShowReducer';

import SearchBox from '../components/SearchBox';
import TVList from '../components/TVList';
import WatchlistPanel from '../components/WatchlistPanel';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';

const API_URL = 'https://api.tvmaze.com/search/shows?q=';

const Home = () => {
  const [state, dispatch] = useReducer(tvShowReducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 6;

  // API'den veri çekmek için kullanılan useEffect
  useEffect(() => {
    const fetchShows = async () => {
      dispatch({ type: actions.FETCH_INIT });
      try {
        const result = await axios(`${API_URL}${state.query || 'star'}`);
        dispatch({ type: actions.FETCH_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: actions.FETCH_FAILURE });
      }
    };
    
    const timeoutId = setTimeout(() => {
        fetchShows();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [state.query]);

  // --- YENİ EKLENEN useEffect ---
  // state.watchlist her değiştiğinde bu hook çalışacak ve listeyi localStorage'a kaydedecek
  useEffect(() => {
    // state.watchlist dizisini JSON formatında bir string'e çevirip kaydediyoruz.
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  }, [state.watchlist]);
  // --- YENİ useEffect SONU ---

  const filteredData = useMemo(() => {
    return state.data.filter(item => {
      const show = item.show;
      const { genre, language, rating } = state.filters;

      const genreMatch = genre === 'all' || show.genres.includes(genre);
      const languageMatch = language === 'all' || show.language === language;
      const ratingMatch = rating == 0 || (show.rating.average && show.rating.average >= rating);
      
      return genreMatch && languageMatch && ratingMatch;
    });
  }, [state.data, state.filters]);

  const handleSearch = (query) => {
    dispatch({ type: actions.SET_QUERY, payload: query });
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    dispatch({ type: actions.SET_FILTERS, payload: newFilters });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    dispatch({ type: actions.SET_FILTERS, payload: initialFilters });
    setCurrentPage(1);
  }
  
  const handleAddToWatchlist = (show) => {
      dispatch({ type: actions.ADD_TO_WATCHLIST, payload: show });
  }

  const handleRemoveFromWatchlist = (id) => {
      dispatch({ type: actions.REMOVE_FROM_WATCHLIST, payload: id });
  }
  
  const handleClearWatchlist = () => {
      dispatch({ type: actions.CLEAR_WATCHLIST });
  }

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = filteredData.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.ceil(filteredData.length / showsPerPage);

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="top-bar">
          <SearchBox query={state.query} onSearch={handleSearch} />
          <Filters 
            filters={state.filters} 
            onFilterChange={handleFilterChange} 
            onReset={handleResetFilters} 
          />
        </div>
        
        {state.isLoading ? (
          <p className="message">Yükleniyor...</p>
        ) : state.isError ? (
          <p className="message error">Bir hata oluştu. Lütfen tekrar deneyin.</p>
        ) : currentShows.length > 0 ? (
          <>
            <TVList shows={currentShows} onAddToWatchlist={handleAddToWatchlist} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        ) : (
           <p className="message">Arama kriterlerinize uygun sonuç bulunamadı.</p>
        )}
      </div>

      <aside className="sidebar">
          <WatchlistPanel 
            watchlist={state.watchlist}
            onRemove={handleRemoveFromWatchlist}
            onClear={handleClearWatchlist}
          />
      </aside>
    </div>
  );
};

export default Home;