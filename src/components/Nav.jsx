import '../styles/nav.scss';

function Nav(props) {
  const setView = props.changeView;
  const handleLogout = () => {
    props.setUserId('');
    localStorage.clear();
  };

  return (
    <div className='nav'>
      <p>User Id: {props.userId}</p>
      <button
        onClick={() => {
          setView('collection');
        }}
      >
        My Collection
      </button>
      <button
        onClick={() => {
          setView('search');
        }}
      >
        Search Games
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Nav;
