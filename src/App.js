import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import React, { useEffect, useState } from 'react';
import Detail from './pages/Detail';
import Like from './pages/Like';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
  {
    path: '/like',
    element: <Like />,
  },
]);

export const MovieChartContext = React.createContext();
export const GenreListContext = React.createContext();

function App() {
  const [movieChart, setMovieChart] = useState([]);

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
    return data.map((movie) => {
      return {
        rank: movie.rank,
        movieNm: movie.movieNm,
      };
    });
  };

  const getMovieDetail = async (movieNm) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieNm}&language=ko-KR`
      )
    ).json();
    return data;
  };

  useEffect(() => {
    getMovieChart().then((res) => {
      const newArr = [];
      for (let i = 0; i < res.length; i++) {
        let name = res[i].movieNm;
        if (!isNaN(name[name.length - 1])) {
          name = name.slice(0, name.length - 1);
        }
        getMovieDetail(name).then((res2) => {
          const data = res2.results[0];
          newArr.push({ ...res[i], ...data });

          if (newArr.length === 10) {
            newArr.sort((a, b) => {
              if (parseInt(a.rank) < parseInt(b.rank)) {
                return -1;
              } else if (parseInt(a.rank) > parseInt(b.rank)) {
                return 1;
              } else {
                return 0;
              }
            });
            setMovieChart(newArr);
          }
        });
      }
    });
  }, []);

  return (
    <MovieChartContext.Provider value={movieChart}>
      <RouterProvider router={router}>
        <div className="App"></div>
      </RouterProvider>
    </MovieChartContext.Provider>
  );
}

export default App;
