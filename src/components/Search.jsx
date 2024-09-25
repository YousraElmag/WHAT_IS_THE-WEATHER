import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Tips from './tips';
import useRandomImage from './useRandomImage'

const Search = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  const weatherApiKey = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    if (searchQuery) {
      fetchWeather(searchQuery);
      fetchAttractions(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (weatherData) {
      const updateTime = () => {
        const localTime = convertToLocalTime(weatherData.dt, weatherData.timezone);
        setCurrentTime(localTime);
      };

      updateTime(); 

      const intervalId = setInterval(updateTime, 60000); 

      return () => clearInterval(intervalId); 
    }
  }, [weatherData]);

  const fetchWeather = async (location) => {
    const weatherOptions = {
      params: {
        q: location,
        appid: weatherApiKey,
        units: 'metric',
      },
    };

    try {
      setLoading(true);
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', weatherOptions);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttractions = async (cityName) => {
    try {
      const wikiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${cityName}&prop=extracts|pageimages&exintro=1&explaintext=1&origin=*`);
      const pages = wikiResponse.data.query.pages;
      const page = Object.values(pages)[0];

      if (page) {
        const hh = page.thumbnail;
        if (hh) {
          setThumbnailUrl(hh.source);
        }

        const shortExtract = page.extract.length > 500 ? page.extract.substring(0, 500) + '...' : page.extract;
        setAttractions([shortExtract]);
      } else {
        setAttractions([]);
      }
    } catch (error) {
      console.error('Error fetching attractions:', error);
      setError('Failed to fetch attractions.');
    }
  };

  const convertToLocalTime = (timestamp, timezoneOffset) => {
    const utcDate = new Date(timestamp * 1000);
    const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);
    return localDate.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };
  const randomDayImage = useRandomImage(currentTime); 
  return (
    <div className="page-container">
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-section">
          <h2>Weather in {weatherData.name} <span>NOW !</span></h2>
           
          <Tips  currentWeather={weatherData} />
          <h2>{weatherData.main.temp}°C</h2>
        <h2>Humidity:{weatherData.main.humidity}</h2>
        <h2>Wind-speed:{weatherData.wind.speed} m/s</h2>
        <h2>Min:{weatherData.main.temp_min}°C</h2>
        <h2>Max:{weatherData.main.temp_max}°C</h2>
        <h2>Information about {searchQuery}</h2>
        <p className='short'>{attractions[0]}</p>
        </div>
      
      )}
      {attractions.length > 0 && (
        <div className="attractions-section">
        
            <img 
              src={randomDayImage} 
              alt='' 
              className="city-thumbnail"
            />
         
         
        </div>
      )}
    </div>
  );
};

export default Search;
