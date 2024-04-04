import { useContext, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import TitleBox from '../components/TitleBox';
import { MovieChartContext } from '../App';
import NowHot from '../components/NowHot';

const Home = () => {
  const movieChart = useContext(MovieChartContext);
  const [nowHot, setNowHot] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carousel = useRef();

  const getMovieDetail = async (movieNm) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieNm}&language=ko-KR`
      )
    ).json();
    return data;
  };

  useEffect(() => {
    if (movieChart.length === 10) {
      const top3 = movieChart.slice(0, 3);

      const newArr = [];
      for (let i = 0; i < 3; i++) {
        getMovieDetail(top3[i].movieNm).then((res) => {
          const data = res.results[0];
          newArr.push({ ...top3[i], ...data });

          if (newArr.length === 3) {
            newArr.sort((a, b) => {
              if (a.rank < b.rank) {
                return -1;
              } else if (a.rank > b.rank) {
                return 1;
              } else {
                return 0;
              }
            });
            setNowHot(newArr);
          }
        });
      }
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

  return (
    <div>
      <Header />
      <main>
        <div className="NowHot_carousel">
          <div className="NowHot_wrapper" ref={carousel}>
            {nowHot.length > 0
              ? nowHot.map((movie) => {
                  return <NowHot key={movie.id} {...movie} />;
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
        <div className="top10_wrapper">
          <div className="top10_movie">
            <div className="top10_rank">1</div>
            <img
              alt="포스터"
              src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240207_151%2F1707288437263gBsdd_JPEG%2Fmovie_image.jpg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
