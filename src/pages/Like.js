import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleBox from '../components/TitleBox';
import Cast from '../components/Cast';
import Slider from 'react-slick';

const Like = () => {
  const [likeList, setLikeList] = useState([]);
  const [personDetail, setPersonDetail] = useState([]);
  const [curActor, setCurActor] = useState('');
  const [curActorName, setCurActorName] = useState('');
  const [movieList, setMovieList] = useState([]);

  const getPersonDetail = async (id) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/person/${id}?language=ko&api_key=${API_KEY}&append_to_response=movie_credits`
      )
    ).json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('like_actors'));
    if (data !== null) {
      setLikeList(data);
    }
  }, []);

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < likeList.length; i++) {
      getPersonDetail(likeList[i]).then((res) => {
        newArr.push(res);
        if (newArr.length === likeList.length) {
          setPersonDetail(newArr);
          setCurActor(likeList[0]);
        }
      });
    }
  }, [likeList]);

  useEffect(() => {
    if (personDetail.length > 0) {
      const newList = personDetail.filter((li) => li.id === curActor)[0];
      const posterList = newList.movie_credits.cast.map((li) => li.poster_path);

      setMovieList(posterList);
      setCurActorName(newList.name);
    }
  }, [curActor]);

  const aSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: likeList.length < 6 ? likeList.length : 6,
    slidesToScroll: likeList.length < 6 ? likeList.length : 6,
    initialSlide: 0,
  };
  const bSettings = {
    className: 'slider variable-width',
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 1500,
    infinite: true,
  };

  return (
    <div className="Like">
      <Header />
      <main>
        <TitleBox content={'당신이 찜한 배우'} />
        <div className="like_actors-wrapper">
          <div className="slider-container">
            {personDetail.length > 0 ? (
              <Slider {...aSettings}>
                {personDetail.map((li) => {
                  return (
                    <Cast
                      key={li.id}
                      heartView={false}
                      charShow={false}
                      profile_path={li.profile_path}
                      name={li.name}
                      id={li.id}
                      darkMode={curActor !== li.id}
                      setCurActor={setCurActor}
                    />
                  );
                })}
              </Slider>
            ) : (
              <div className="noLike">찜한 배우가 없습니다.</div>
            )}
          </div>
        </div>
        {curActor !== '' ? (
          <>
            <TitleBox content={`${curActorName} 의 필모그래피`} />
            <div className="like_movie-list">
              <div className="slider-container">
                <Slider {...bSettings}>
                  {movieList.map((path, i) => {
                    return (
                      <div className="like_movie-item" key={`poster_${i}`}>
                        <img
                          alt="poster"
                          src={`https://image.tmdb.org/t/p/original${path}`}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Like;
