import '../styles/nav.scss';

function Nav(props) {
  const setView = props.changeView;
  const handleLogout = () => {
    props.setUserId('');
    localStorage.clear();
  };

  return (
    <div className='nav'>
      <div className='menu'>
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
      <h2>hoardgames</h2>
    </div>
  );
}

export default Nav;
