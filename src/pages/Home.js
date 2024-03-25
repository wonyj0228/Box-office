import { useEffect, useState } from 'react';
import Genre from '../components/Genre';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import TitleBox from '../components/TitleBox';

const Home = () => {
  const [movieChart, setMovieChart] = useState([]);

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const yesterdayStr = yesterday
    .toLocaleDateString()
    .split('.')
    .filter((v) => v !== '')
    .map((v) =>
      v.replace(' ', '').length >= 2
        ? v.replace(' ', '')
        : v.replace(' ', '').padStart(2, '0')
    )
    .join('');

  const getMovieChart = async () => {
    const rowData = await fetch(
      `	http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=d95e0891d4c7f97fa098d3e7c0d7b093&targetDt=${yesterdayStr}`
    );
    let data = await rowData.json();
    data = data.boxOfficeResult.dailyBoxOfficeList.map((it) => {
      const obj = {
        rank: it.rank,
        movieNm: it.movieNm,
        openDt: it.openDt,
      };

      return obj;
    });
    setMovieChart(data);
    console.log(data);
  };

  useEffect(() => {
    getMovieChart();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <TitleBox content={'인기 상영작'} />
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
          <iframe
            src="https://www.youtube.com/embed/PnLp7HaN1ao"
            title="인기 상영작 예고편"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        <TitleBox content={'무비차트 TOP 10'} />
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
