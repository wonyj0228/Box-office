import { useContext, useEffect, useState } from 'react';
import Genre from '../components/Genre';
import Header from '../components/Header';
import TitleBox from '../components/TitleBox';
import { MovieChartContext } from '../App';

const Home = () => {
  const movieChart = useContext(MovieChartContext);

  const getMovieDetail = async (movieNm) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieNm}&language=ko-KR`
      )
    ).json();
    return data.results;
  };

  return (
    <div>
      <Header />
      <main>
        <div className="NowHot_wrapper">
          <div className="NowHot">
            <div className="NowHot_info">
              <div className="NowHot_rank">1</div>
              <div className="NowHot_title">파묘</div>
              <div className="NowHot_genre">
                <Genre text={'미스터리'} />
                <Genre text={'공포'} />
                <Genre text={'스릴러'} />
              </div>
              <div className="NowHot_summary">
                미국 LA, 거액의 의뢰를 받은 무당 화림과 봉길은 기이한 병이
                대물림되는 집안의 장손을 만난다. 조상의 묫자리가 화근임을 알아챈
                화림은 이장을 권하고, 돈 냄새를 맡은 최고의 풍수사 상덕과 장의사
                영근이 합류한다...
              </div>
            </div>
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
          <div className="top10_movie">
            <div className="top10_rank">2</div>
            <img
              alt="포스터"
              src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240207_151%2F1707288437263gBsdd_JPEG%2Fmovie_image.jpg"
            />
          </div>
          <div className="top10_movie">
            <div className="top10_rank">3</div>
            <img
              alt="포스터"
              src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240207_151%2F1707288437263gBsdd_JPEG%2Fmovie_image.jpg"
            />
          </div>
          <div className="top10_movie">
            <div className="top10_rank">11</div>
            <img
              alt="포스터"
              src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240207_151%2F1707288437263gBsdd_JPEG%2Fmovie_image.jpg"
            />
          </div>
          <div className="top10_movie">
            <div className="top10_rank">18</div>
            <img
              alt="포스터"
              src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240207_151%2F1707288437263gBsdd_JPEG%2Fmovie_image.jpg"
            />
          </div>
          <div className="top10_movie">
            <div className="top10_rank">19</div>
            <img
              alt="포스터"
              src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240207_151%2F1707288437263gBsdd_JPEG%2Fmovie_image.jpg"
            />
          </div>
          <div className="top10_movie">
            <div className="top10_rank">20</div>
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
