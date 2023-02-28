function Nav(props) {
  const handleLogout = () => {
    props.setLoggedIn(false);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Nav;
