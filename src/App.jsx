import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
            <div className="logo-container">
              <img src="/logo.svg" alt="Kampüs Film Kulübü Logosu" className="logo" />
              <h1>Kampüs Film Kulübü</h1>
            </div>
            <a href="/" className="main-page-link">Ana Sayfa</a>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;