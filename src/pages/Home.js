import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleBox from '../components/TitleBox';
import { MovieChartContext } from '../App';
import NowHot from '../components/NowHot';

const Home = () => {
  const movieChart = useContext(MovieChartContext);
  const [nowHot, setNowHot] = useState([]);

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
    const top3 = movieChart.slice(0, 3);

    for (let i = 0; i < top3.length; i++) {
      getMovieDetail(top3[i].movieNm).then((res) => {
        if (res.results.length >= 1) {
          const data = res.results[0];
          setNowHot((prev) => {
            const oldObj = [...prev];
            const newObj = { ...prev[i], ...data };
            oldObj[i] = newObj;
            return oldObj;
          });
        } else {
          getMovieDetail(top3[i].movieNm[0]).then((res) => {
            if (res.results.length >= 1) {
              const data = res.results[0];
              setNowHot((prev) => {
                const oldObj = [...prev];
                const newObj = { ...prev[i], ...data };
                oldObj[i] = newObj;
                return oldObj;
              });
            }
          });
        }
      });
    }
  }, [movieChart]);

  return (
    <div>
      <Header />
      <main>
        {nowHot.length > 0
          ? nowHot.map((movie) => {
              return <NowHot key={movie.id} {...movie} />;
            })
          : null}

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
