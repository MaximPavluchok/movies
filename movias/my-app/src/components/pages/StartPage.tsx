import './styles-start-page.scss'
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';
import LoginPage from '../auth/login/LoginPage';
import React, { useState, useEffect } from 'react';

const StartPage: React.FC = () => {
  const backgroundImages: string[] = [
    'https://www.kanopy.com/kui-assets/img/MOONLIGHT.79e11a3.jpg',
    'https://www.kanopy.com/kui-assets/img/BOOKSHOP.d600fd7.jpg',
    'https://www.kanopy.com/kui-assets/img/CAPTAIN_FANTASTIC.70abebf.jpg',
    'https://www.kanopy.com/kui-assets/img/COLETTE.ab0d3aa.jpg',
    'https://www.kanopy.com/kui-assets/img/LADY_BIRD.7dcc1e8.jpg',
    'https://www.kanopy.com/kui-assets/img/HER_SMELL.7f14fa0.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);

    return () => clearInterval(interval);
  }, []);

  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
  };

  return (
    <>
        <div className='fone' style={backgroundImageStyle}></div>
        <div className='line1'></div>
        <div className='line2'></div>
        <img className='logo' src='https://cdn.discordapp.com/attachments/965645827035000862/1148379196280799342/lolo-foto.png'></img>
        <div className='struct1'>
            <h1>Об'єднання різноманітної колекції фільмів.</h1>
        </div>
        <p>Дивіться більш ніж 1000 фiльмів онлайн абсолютно безкоштовно!</p>
        <Link to="/login"><button className='btn-start'>Почати</button></Link>
    </>
  );
};

export default StartPage;
