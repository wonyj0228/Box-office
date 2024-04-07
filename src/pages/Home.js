import React, { useContext, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import Header from '../components/Header';
import TitleBox from '../components/TitleBox';
import NowHot from '../components/NowHot';

import { MovieChartContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const movieChart = useContext(MovieChartContext);
  const [nowHot, setNowHot] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carousel = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieChart.length === 10) {
      const top3 = movieChart.slice(0, 3);
      setNowHot(top3);
    }
  }, [movieChart]);

  const nextSlide = () => {
    if (currentSlide === 2) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(2);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    carousel.current.style.transition = 'all 0.5s ease-in-out';
    const widthPer = 33 * currentSlide;
    carousel.current.style.transform = `translateX(-${widthPer}%)`;
  }, [currentSlide]);

  const settings = {
    className: 'slider variable-width',
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    speed: 1500,
  };

  return (
    <div>
      <Header />
      <main>
        <div className="NowHot_carousel">
          <div className="NowHot_wrapper" ref={carousel}>
            {nowHot.length > 0
              ? nowHot.map((movie) => {
                  return (
                    <NowHot
                      key={movie.id}
                      onClick={() => navigate(`/detail/${movie.id}`)}
                      {...movie}
                    />
                  );
                })
              : null}
          </div>
          <div className="carousel-prev" onClick={prevSlide}>
            <i className="fa-solid fa-angles-left"></i>
          </div>
          <div className="carousel-next" onClick={nextSlide}>
            <i className="fa-solid fa-angles-right"></i>
          </div>
          <div className="carousel-circle">
            <div
              className={currentSlide === 0 ? 'circle circle-cur' : 'circle'}
            ></div>
            <div
              className={currentSlide === 1 ? 'circle circle-cur' : 'circle'}
            ></div>
            <div
              className={currentSlide === 2 ? 'circle circle-cur' : 'circle'}
            ></div>
          </div>
        </div>

        <TitleBox content={'대한민국 TOP 10'} />
        <div className="slider-container">
          <Slider {...settings}>
            {movieChart.map((movie) => {
              return (
                <div
                  key={`top10_${movie.id}`}
                  onClick={() => navigate(`/detail/${movie.id}`)}
                >
                  <div className="top10_movie">
                    <div className="top10_rank">{movie.rank}</div>
                    {movie.poster_path ? (
                      <img
                        alt="poster"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      />
                    ) : (
                      <div className="top10_noPoster">{movie.movieNm}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </main>
    </div>
  );
};

export default Home;
