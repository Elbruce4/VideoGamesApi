import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LandingPage/>}/>
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
