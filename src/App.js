import './App.css';
import Header from './components/Header';
import TitleBox from './components/TitleBox';

function App() {
  return (
    <div className="App">
      <Header />
      <TitleBox content={'무비차트 TOP 20'} />
    </div>
  );
}

export default App;
