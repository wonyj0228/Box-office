import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Genre from '../components/Genre';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

const Detail = () => {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState({});
  const [images, setImages] = useState([]);

  const getDetails = async (id) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
    );
    const json = await data.json();
    return json;
  };

  const getImages = async () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
    );
    const json = await data.json();
    return json;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
  };

  useEffect(() => {
    getDetails(id).then((res) => {
      setMovieDetail(res);
    });

    getImages().then((res) => {
      setImages(res.backdrops);
    });
  }, [id]);

  return (
    <div className="Detail">
      {Object.keys(movieDetail).length !== 0 && images.length >= 1 ? (
        <>
          <Header />
          <div className="detail_wrapper">
            <div className="detail_top_wrapper">
              <img
                className="detail_poster"
                alt="poster"
                src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
              />
              <div className="detail_right-box">
                <div className="detail_info">
                  <div className="detail_info-title">{movieDetail.title}</div>
                  <div className="detail_info-plus">
                    <div className="detail_info-plus_date">
                      {`${movieDetail.release_date} 개봉`}
                    </div>
                    <div className="detail_info-plus_review">
                      {String(movieDetail.vote_average) === '0'
                        ? '리뷰가 없습니다'
                        : String(movieDetail.vote_average).substring(0, 3)}
                    </div>
                  </div>
                  <div className="detail_info-genres">
                    {movieDetail.genres.map((genre) => (
                      <Genre key={genre.id} text={genre.name} />
                    ))}
                  </div>
                </div>
                <div className="slider-container detail_img-carousel">
                  <Slider {...settings}>
                    {images.map((image, idx) => {
                      return (
                        <img
                          key={`backdrops_${idx}`}
                          className="detail_backdrops"
                          alt="backdrop"
                          src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                        />
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="detail_summary">{movieDetail.overview}</div>
          </div>
          <div className="detail_casts"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
