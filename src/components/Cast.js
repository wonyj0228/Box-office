const Cast = ({
  profile_path,
  name,
  character,
  charShow,
  id,
  setLikeList,
  checked,
  heartView,
  setCurActor,
  darkMode,
}) => {
  const likeCheck = () => {
    if (checked) {
      setLikeList((prevList) =>
        prevList.filter((idItem) => String(id) !== String(idItem))
      );
    } else {
      setLikeList((prevList) => [...prevList, id]);
    }
  };

  return (
    <div className="Cast">
      {profile_path ? (
        <div className="cast_img-wrapper">
          <img
            className="cast_img"
            src={`https://image.tmdb.org/t/p/original${profile_path}`}
          />
          {heartView ? (
            <div
              className={checked ? 'cast_heart cast_heart-liked' : 'cast_heart'}
              onClick={likeCheck}
            >
              <i className="fa-solid fa-heart"></i>
            </div>
          ) : (
            <div
              className={darkMode ? 'cast_darkClick' : 'cast_whiteClick'}
              onClick={(e) => {
                setCurActor(id);
              }}
            >
              {' '}
            </div>
          )}
        </div>
      ) : (
        <div className="cast_img-wrapper">
          <div className="cast_noImg"></div>
          {heartView ? (
            <div className="cast_heart">
              <i className="fa-solid fa-heart"></i>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}

      <div className="cast_name">{name}</div>
      {charShow ? <div className="cast_character">{character}</div> : null}
    </div>
  );
};

export default Cast;
