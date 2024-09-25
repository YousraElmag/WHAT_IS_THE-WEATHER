import React, { useEffect, useState } from 'react';
import useWeather from './useWeather';

export default function useMood() {
    const [Background,setBackground]=useState('')
    const [CardColor,setCardColor]=useState('')
    const [AlternateBackground, setAlternateBackground] = useState('');
    const [AlternateCardColor, setAlternateCardColor] = useState('');
    const {currentTime}=useWeather();
const isDayTime = (time) => {
        const hours = new Date(time).getHours();
        return hours >= 6 && hours < 18;  
      };
      useEffect(()=>{
setBackground(isDayTime(currentTime) ? 'day' : 'night')
 setCardColor (isDayTime(currentTime) ? 'cardcolor' : 'card')
 setAlternateBackground(isDayTime(currentTime)?'night':'day')
 setAlternateCardColor(isDayTime(currentTime)?'card':'cardcolor')
      },[currentTime])
      
   
  return (
    {Background , CardColor ,AlternateBackground,AlternateCardColor}
  )
}


