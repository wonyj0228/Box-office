import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleBox from '../components/TitleBox';
import Cast from '../components/Cast';

const Like = () => {
  const [likeList, setLikeList] = useState([]);
  const [personDetail, setPersonDetail] = useState([]);
  const [curActor, setCurActor] = useState('');
  const [movieList, setMovieList] = useState([]);

  const getPersonDetail = async (id) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/person/${id}?language=ko&api_key=${API_KEY}&append_to_response=movie_credits`
      )
    ).json();

    return data;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('like_actors'));
    setLikeList(data);
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
    }
  }, [curActor]);

  return (
    <div className="Like">
      <Header />
      <main>
        <TitleBox content={'당신이 찜한 배우'} />
        <div className="like_actors-wrapper">
          {personDetail.length > 0 ? (
            personDetail.map((li) => {
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
            })
          ) : (
            <div>찜한 배우가 없습니다.</div>
          )}
        </div>
        <div className="like_movie-list">
          {movieList.map((path, i) => {
            return (
              <div>
                <img
                  alt="poster"
                  key={`poster_${i}`}
                  src={`https://image.tmdb.org/t/p/original${path}`}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Like;
