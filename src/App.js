import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import React, { useEffect, useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export const MovieChartContext = React.createContext();
export const GenreListContext = React.createContext();

function App() {
  const [movieChart, setMovieChart] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const yesterdayStr = yesterday
    .toLocaleDateString()
    .split('.')
    .filter((v) => v !== '')
    .map((v) =>
      v.replace(' ', '').length >= 2
        ? v.replace(' ', '')
        : v.replace(' ', '').padStart(2, '0')
    )
    .join('');

  const getMovieChart = async () => {
    const API_KEY = process.env.REACT_APP_KOFIC_API_KEY;
    const rowData = await (
      await fetch(
        `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${yesterdayStr}`
      )
    ).json();
    const data = rowData.boxOfficeResult.dailyBoxOfficeList;
    setMovieChart(
      data.map((movie) => {
        return {
          rank: movie.rank,
          movieNm: movie.movieNm,
          openDt: movie.openDt,
        };
      })
    );
  };

  const getGenreList = async () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=ko&api_key=${API_KEY}`
      )
    ).json();
    setGenreList(data.genres);
  };

  useEffect(() => {
    getMovieChart();
    getGenreList();
  }, []);

  return (
    <MovieChartContext.Provider value={movieChart}>
      <GenreListContext.Provider value={genreList}>
        <RouterProvider router={router}>
          <div className="App"></div>
        </RouterProvider>
      </GenreListContext.Provider>
    </MovieChartContext.Provider>
  );
}

export default App;
