import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import RanderWeather from './components/randerweather';

import Search from './components/Search';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
   
    <Router>
    
      <NavBar /> 
        <Routes>
          <Route path="/" element={<RanderWeather />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback for 404 */}
        </Routes>
        <Footer />
    </Router>
    
  );
}

export default App;



