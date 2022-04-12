import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import GameDetail from './components/GamesDetail';
import CreateComment from './components/CreateComment';
import OneGame from './components/OneGame';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import CreateGame from './components/CreateGame';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LandingPage/>}/>
          <Route path='/signIn' element={<SignIn/>}/>
          <Route path='/logIn' element={<LogIn/>}/>
          <Route path='/home' element={<Home />} />
          <Route path='/:id' element={<GameDetail />} />
          <Route path='/:id/leaveComment' element={<CreateComment />} />
          <Route path='/gameDetail/:game' element={<OneGame />} />
          <Route path='/createGame' element={<CreateGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
