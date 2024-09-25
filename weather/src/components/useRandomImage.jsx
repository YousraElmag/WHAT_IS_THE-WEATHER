
import { useState, useEffect } from 'react';
const dayImages = import.meta.glob('../assets/day/*.{png,jpg,jpeg,gif}');
const nightImages = import.meta.glob('../assets/night/*.{png,jpg,jpeg,gif}');

const getRandomImage = async (imageImports) => {
  const imagePaths = Object.keys(imageImports);
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const imageModule = await imageImports[imagePaths[randomIndex]]();
  return imageModule.default; 
};

const useRandomImage = (isDayTime) => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      const imageImports = isDayTime ? dayImages : nightImages;
      const image = await getRandomImage(imageImports);
      setRandomImage(image);
    };

    fetchRandomImage();
  }, [isDayTime]);

  return randomImage;
};

export default useRandomImage;
