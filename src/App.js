import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Nav from './components/Nav';
import Search from './components/Search';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className='App'>
      {!loggedIn && <Login setLoggedIn={setLoggedIn} />}
      {loggedIn && <Nav setLoggedIn={setLoggedIn} />}
      {<Search />}
    </div>
  );
}

export default App;
