import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Genre from '../components/Genre';
import TitleBox from '../components/TitleBox';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Cast from '../components/Cast';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieDetail, setMovieDetail] = useState({});
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState([]);
  const [likeList, setLikeList] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const getDetails = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
    );
    const json = await data.json();
    return json;
  };

  const getImages = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
    );
    const json = await data.json();
    return json;
  };

  const getCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
    );
    const json = await data.json();
    return json;
  };

  const getLikeList = () => {
    const data = JSON.parse(localStorage.getItem('like_actors'));
    if (data) {
      setLikeList(data);
    }
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

    getCredits().then((res) => {
      setCredits(res.cast.slice(0, 15));
    });

    getLikeList();
  }, [id]);

  useEffect(() => {
    const list = JSON.stringify(likeList);
    localStorage.setItem('like_actors', list);
  }, [likeList]);

  return (
    <div className="Detail">
      {Object.keys(movieDetail).length !== 0 && images.length >= 1 ? (
        <>
          <Header />
          <div className="detail_wrapper">
            <div className="detail_top_wrapper">
              <div className="page-prev" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-angles-left"></i>
              </div>
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
            <div className="detail_casts">
              <TitleBox content={'캐스팅'} />
              <div className="casts_list">
                {credits.map((cast) => {
                  return (
                    <Cast
                      key={cast.id}
                      charShow={true}
                      checked={likeList.includes(cast.id)}
                      setLikeList={setLikeList}
                      heartView={true}
                      {...cast}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
