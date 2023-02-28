import './styles/app.scss';
import { useState } from 'react';
import Login from './components/Login';
import Nav from './components/Nav';
import Search from './components/Search';
import Collection from './components/Collection';
import SignUp from './components/SignUp';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('loggedInUser'));
  const [view, setView] = useState('collection');
  const [loggedOutView, setLoggedOutView] = useState('login');

  console.log(loggedOutView);
  return (
    <div className='App'>
      {!userId && loggedOutView === 'login' && (
        <Login setUserId={setUserId} setLoggedOutView={setLoggedOutView} />
      )}
      {!userId && loggedOutView === 'signUp' && (
        <SignUp setUserId={setUserId} setLoggedOutView={setLoggedOutView} />
      )}
      {userId && (
        <Nav setUserId={setUserId} userId={userId} changeView={setView} />
      )}
      {userId && view === 'search' && <Search userId={userId} />}
      {userId && view === 'collection' && <Collection userId={userId} />}
    </div>
  );
}

export default App;
