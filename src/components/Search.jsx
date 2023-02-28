import { useEffect, useState } from 'react';
import '../styles/search.sass';

function Search(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    async function searchGames() {
      try {
        const response = await fetch(
          'https://api.boardgameatlas.com/api/search?name=' +
            searchTerm +
            '&pretty=true&client_id=JLBr5npPhV'
        );
        const data = await response.json();

        // extract the search results
        const searchResults = data.games.map((game) => ({
          id: game.id,
          name: game.name,
          member_id: props.userId,
          minplayer: game.min_players,
          maxplayer: game.max_players,
          image_url: game.thumb_url,
        }));

        setSearchResults(searchResults);
      } catch (error) {
        console.error(error);
      }
    }

    searchGames();
  }, [searchTerm]);

  const addToCollection = async (game) => {
    try {
      const response = await fetch('http://localhost:5000/user/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
      });

      const result = await response;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='search'>
      <input type='search' onChange={handleSearch} placeholder='search'></input>
      <h1>Search results for {searchTerm}</h1>
      <ul>
        {searchResults.map((game) => (
          <li key={game.id}>
            <img src={game.image_url} alt={game.name} />
            Name: {game.name}, Players: {game.minplayer} - {game.maxplayer}
            <button
              id={game.id}
              onClick={() => {
                addToCollection(game);
              }}
            >
              Add to Collection
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
