import React from 'react';

const Tips = ({ currentWeather, forecastWeather }) => {
  // **1. Generate a tip for the current weather**
  const getCurrentWeatherTip = () => {
    if (currentWeather) {
      const weatherCondition = currentWeather.weather[0].main.toLowerCase();

      if (weatherCondition.includes('rain')) {
        return 'It’s rainy today! Don’t forget your umbrella.';
      }
      if (weatherCondition.includes('clear')) {
        return 'The weather is clear today. Enjoy the sunshine!';
      }
      if (weatherCondition.includes('snow')) {
        return 'It’s snowing today! Bundle up and stay warm.';
      }
      if (weatherCondition.includes('clouds')) {
        return 'It’s cloudy today. You might want to carry a light jacket.';
      }
      if (weatherCondition.includes('storm')) {
        return 'There’s a storm today. Stay safe indoors if possible.';
      }
      return 'The weather is mild today. Have a great day!';
    }
 
  };

  // **2. Generate a tip for tomorrow's forecasted weather**
  const getTomorrowWeatherTip = () => {
    if (forecastWeather) {
      const weatherCondition = forecastWeather.list[0].weather[0].main.toLowerCase();

      if (weatherCondition.includes('rain')) {
        return 'Rain is forecasted for tomorrow. Don’t forget your umbrella!';
      }
      if (weatherCondition.includes('clear')) {
        return 'Tomorrow’s forecast is clear skies. Enjoy the weather!';
      }
      if (weatherCondition.includes('snow')) {
        return 'Snow is expected tomorrow. Be prepared for cold weather.';
      }
      if (weatherCondition.includes('clouds')) {
        return 'Cloudy skies are expected tomorrow. You might want a light jacket.';
      }
      if (weatherCondition.includes('storm')) {
        return 'A storm is forecasted for tomorrow. Stay safe and indoors if possible.';
      }
      return 'Tomorrow looks calm. Have a relaxing day!';
    }

  };

  return (
    <div className='tips'>
      <h2>Weather Tips</h2>

      {/* Display Current Weather Tip */}
      <div>
    
        <p>{getCurrentWeatherTip()}</p>
      </div>

      {/* Display Tomorrow's Weather Tip */}
      <div>
      
        <p>{getTomorrowWeatherTip()}</p>
      </div>
    </div>
  );
};

export default Tips;
