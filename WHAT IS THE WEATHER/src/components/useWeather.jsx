import { useState, useEffect } from "react";
import axios from 'axios';


const apiKey = import.meta.env.VITE_API_KEY;

console.log(apiKey)

const useWeather = () => {
  const [coords, setCoords] = useState(null);
  const [geolocation, setGeolocation] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [forecastTime, setForecastTime] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        setGeolocation(false);
      }
    );
  }, []);
  
  useEffect(() => {
    if (!coords) return;
    
    const { latitude, longitude } = coords;
    
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setCurrentWeather(response.data);
        
        
        const { dt, timezone } = response.data;
        const utcDate = new Date(dt * 1000);
        const localDate = new Date(utcDate.getTime() + timezone );
        
        
        setCurrentTime(localDate);
      } catch (err) {
        console.error('Error fetching current weather:', err);
      }
    };
    
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setForecastWeather(response.data);
     
        
        const forecastList = response.data.list;
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() );
        const tomorrowDateStr = tomorrow.toISOString().split('T')[0];
        setForecastTime(tomorrowDateStr)
        const tomorrowForecast = forecastList.filter((entry) => {
          const entryDate = new Date(entry.dt * 1000);
          return entryDate.toISOString().split('T')[0] === tomorrowDateStr;
        });
        
        if (tomorrowForecast.length > 0) {
          const firstForecastForTomorrow = tomorrowForecast[0];
          const utcDate = new Date(firstForecastForTomorrow.dt * 1000);
          const localDate = new Date(
            utcDate.getTime() + response.data.city.timezone * 1000
          );
          
          setForecastTime(localDate.toLocaleString());
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching forecast:', err);
      }
    };
    
    fetchCurrentWeather();
    fetchForecast();
  }, [coords]);
  
  return {
    currentWeather,
    geolocation,
    forecastWeather,
    currentTime,
    forecastTime,
    loading
  };
};

export default useWeather;
