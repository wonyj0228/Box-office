import { useContext } from 'react';
import { GenreListContext } from '../App';
import Genre from './Genre';

const NowHot = ({ rank, title, genre_ids, overview }) => {
  const genreList = useContext(GenreListContext);

  return (
    <div className="NowHot_wrapper">
      <div className="NowHot">
        <div className="NowHot_info">
          <div className="NowHot_rank">{rank}</div>
          <div className="NowHot_title">{title}</div>
          <div className="NowHot_genre">
            <Genre text={'미스터리'} />
            <Genre text={'공포'} />
            <Genre text={'스릴러'} />
          </div>
          <div className="NowHot_summary">{overview}</div>
        </div>
      </div>
    </div>
  );
};

export default NowHot;
