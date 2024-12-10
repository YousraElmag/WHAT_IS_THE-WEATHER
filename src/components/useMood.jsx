import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars

export default function useMood() {

    const [Background,setBackground]=useState('')
    const [CardColor,setCardColor]=useState('')
    const [AlternateBackground, setAlternateBackground] = useState('');
    const [AlternateCardColor, setAlternateCardColor] = useState('');
    const [currentTime, setCurrentTime] = useState(null);
const isDayTime = (time) => {
        const hours = new Date(time).getHours();
        return hours >= 6 && hours < 18;  
      };
      useEffect(() => {
      
        // Update the current time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);
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


