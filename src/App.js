import './styles/app.sass';
import { useState } from 'react';
import Login from './components/Login';
import Nav from './components/Nav';
import Search from './components/Search';
import Collection from './components/Collection';
import SignUp from './components/SignUp';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('loggedInUser'));
  const [view, setView] = useState('collection');

  return (
    <div className='App'>
      {!userId && <Login setUserId={setUserId} />}
      <SignUp />
      {userId && (
        <Nav setUserId={setUserId} userId={userId} changeView={setView} />
      )}
      {userId && view === 'search' && <Search userId={userId} />}
      {userId && view === 'collection' && <Collection userId={userId} />}
    </div>
  );
}

export default App;
