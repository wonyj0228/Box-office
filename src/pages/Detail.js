import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const Detail = () => {
  const { id } = useParams();

  return (
    <div className="Detail">
      <Header />
      <div className="detail_wrapper">
        <img alt="poster" />
        <div className="detail_right-box">
          <div className="detail_info">
            <div className="detail_info-title"></div>
            <div className="detail_info-plus">
              <div className="detail_info-plus_date"></div>
              <div className="detail_info-plus_review"></div>
            </div>
            <div className="detail_info-genres"></div>
          </div>
          <div className="detail_img-carousel"></div>
        </div>
      </div>
      <div className="detail_summary"></div>

      <div className="detail_casts"></div>
    </div>
  );
};

export default Detail;
