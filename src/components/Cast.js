const Cast = ({ castImg, castName }) => {
  return (
    <div className="Cast">
      <div className="cast_img-wrapper">
        {castImg ? (
          <img
            className="cast_img"
            src={`https://image.tmdb.org/t/p/original${castImg}`}
          />
        ) : (
          <div className="cast_noImg"></div>
        )}
      </div>
      <div className="cast_name">{castName}</div>
    </div>
  );
};

export default Cast;
