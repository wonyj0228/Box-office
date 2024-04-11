import { useEffect, useState } from 'react';
import Genre from './Genre';

const NowHot = ({
  rank,
  title,
  genre_ids,
  overview,
  poster_path,
  backdrop_path,
  onClick,
}) => {
  const [genreList, setGenreList] = useState([]);

  const getGenreList = async () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=ko&api_key=${API_KEY}`
      )
    ).json();
    setGenreList(data.genres);
  };

  const getGenreText = (genre_id) => {
    const idx = genreList.findIndex(({ id, _ }) => id === genre_id);
    return genreList[idx].name;
  };

  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <div className="NowHot_carousel-slide">
      {genreList.length > 0 ? (
        <div className="NowHot">
          <img src={`https://image.tmdb.org/t/p/original${poster_path}`} />
          <div
            className="NowHot_info"
            onClick={onClick}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), 
          rgba(0, 0, 0, 0.5)),
          url(
            https://image.tmdb.org/t/p/original${backdrop_path}
          )`,
            }}
          >
            <div className="NowHot_rank">{rank}</div>
            <div>
              <div className="NowHot_title">{title}</div>
              <div className="NowHot_genre">
                {genre_ids.map((genre) => (
                  <Genre key={genre} text={getGenreText(genre)} />
                ))}
              </div>
            </div>

            <div className="NowHot_summary">{overview}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NowHot;
