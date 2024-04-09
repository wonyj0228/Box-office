const Cast = ({ profile_path, name, character, charShow }) => {
  return (
    <div className="Cast">
      {profile_path ? (
        <div className="cast_img-wrapper">
          <img
            className="cast_img"
            src={`https://image.tmdb.org/t/p/original${profile_path}`}
          />
          <div className="cast_heart">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      ) : (
        <div className="cast_img-wrapper">
          <div className="cast_noImg"></div>
          <div className="cast_heart">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      )}

      <div className="cast_name">{name}</div>
      {charShow ? <div className="cast_character">{character}</div> : null}
    </div>
  );
};

export default Cast;
