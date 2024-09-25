import React, { useEffect, useState } from 'react';
import useWeather from './useWeather'
import Tips from './tips';
import useRandomImage from './useRandomimage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useMood from './useMood'

export default function RenderWeather() {
  const {
    currentWeather,
    forecastWeather,
    currentTime,
    forecastTime,
    loading
  } = useWeather();
const{
  Background,
  CardColor,
  AlternateBackground,
  AlternateCardColor
}=useMood()
  const formattedTime = currentTime ? currentTime.toLocaleString() : 'Loading time...';
  const forecastTimeFormatted = forecastTime ? forecastTime.toLocaleString() : 'Loading time...';
  const isDayTime = (time) => {
    const hours = new Date(time).getHours();
    return hours >= 6 && hours < 18;  
  };

  const randomDayImage = useRandomImage(isDayTime(currentTime));  
  const randomNightImage = useRandomImage(isDayTime(forecastTime));  

  const [isAlternate, setIsAlternate] = useState(false);
  
  
  // Handler to toggle mood
  const toggleMood = () => {
    setIsAlternate(prev => !prev);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentWeather || !forecastWeather) {
    return <div>No weather data available.</div>;
  }

  return (
    
    <div className={isAlternate ? AlternateBackground : Background}>
      <i className={`fa-regular ${isAlternate ? 'fa-sun' : 'fa-moon'}`} onClick={toggleMood}></i>
      <div className={isAlternate ? AlternateCardColor : CardColor}>
        <h2>{currentWeather.name} Now !!! <span>{currentWeather.weather[0].description}</span></h2>
        <h4>{formattedTime}</h4>
        <div className="data">
          <div className="img">
            {randomDayImage && isDayTime(currentTime) && (
              <img src={randomDayImage} alt="Weather" style={{ width: '200px' }} />
            )}
            {randomNightImage && !isDayTime(currentTime) && (
              <img src={randomNightImage} alt="Weather" style={{ width: '200px' }} />
            )}
          </div>
          <div className="all">
            <h3>{currentWeather.main.temp}°C</h3>
            <h3>feeling: {currentWeather.main.feels_like}°C</h3>
            <h3>Humidity: {currentWeather.main.humidity}%</h3>
            <h3>Wind: {currentWeather.wind.speed} m/s</h3>
            <h3>Max: {currentWeather.main.temp_max}°C</h3>
            <h3>Min: {currentWeather.main.temp_min}°C</h3>
          </div>
        </div>
        <Tips currentWeather={currentWeather} />
      </div>

   
      <div className={isAlternate ? AlternateCardColor : CardColor}>
        <h2>{forecastWeather.city.name} Tomorrow !!! <span>{forecastWeather.list[0].weather[0].description}</span></h2>
        <h4>{forecastTimeFormatted}</h4>
        <div className="data">
          <div className="img">
            
              <img src={randomNightImage} alt="Weather" style={{ width: '200px' }} />
            
          </div>
          <div className="all">
            <h3>{forecastWeather.list[0].main.temp}°C</h3>
            <h3>feeling: {forecastWeather.list[0].main.feels_like}°C</h3>
            <h3>Humidity: {forecastWeather.list[0].main.humidity}%</h3>
            <h3>Wind: {forecastWeather.list[0].wind.speed} m/s</h3>
            <h3>Max: {forecastWeather.list[0].main.temp_max}°C</h3>
            <h3>Min: {forecastWeather.list[0].main.temp_min}°C</h3>
          </div>
        </div>
        <Tips forecastWeather={forecastWeather} />
      </div>
    </div>
  );
}
