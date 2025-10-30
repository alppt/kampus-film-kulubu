// tvShowReducer.js

export const actions = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  ADD_TO_WATCHLIST: 'ADD_TO_WATCHLIST',
  REMOVE_FROM_WATCHLIST: 'REMOVE_FROM_WATCHLIST',
  CLEAR_WATCHLIST: 'CLEAR_WATCHLIST',
  SET_FILTERS: 'SET_FILTERS',
};

export const initialFilters = {
    genre: 'all',
    language: 'all',
    rating: 0,
};

// --- YENİ EKLENEN KISIM BAŞLANGICI ---
// localStorage'dan kayıtlı watchlist'i almayı dene
const savedWatchlist = localStorage.getItem('watchlist');
// Eğer kayıtlı bir liste varsa onu parse et, yoksa boş bir dizi kullan
const initialWatchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];
// --- YENİ EKLENEN KISIM SONU ---

export const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  query: 'black mirror',
  watchlist: initialWatchlist, // <-- DEĞİŞİKLİK BURADA: Artık localStorage'dan geliyor
  filters: initialFilters,
};

export const tvShowReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case actions.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actions.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case actions.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case actions.ADD_TO_WATCHLIST:
      if (state.watchlist.find((item) => item.show.id === action.payload.show.id)) {
        return state;
      }
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    case actions.REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (item) => item.show.id !== action.payload
        ),
      };
    case actions.CLEAR_WATCHLIST:
      return {
        ...state,
        watchlist: [],
      };
    default:
      throw new Error();
  }
};