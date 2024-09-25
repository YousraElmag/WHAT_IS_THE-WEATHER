import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import RanderWeather from './components/RanderWeather';
import Search from './components/Search';
import NavBar from './components/NavBar';
import Footer from './components/footer'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);  
  if (loading) {
    return <div>Loading...</div>; 
  }

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
