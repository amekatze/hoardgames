import { useEffect, useState } from 'react';
import '../styles/search.scss';

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
          min_player: game.min_players,
          max_player: game.max_players,
          min_playtime: game.min_playtime,
          max_playtime: game.max_playtime,
          image_url: game.thumb_url,
          year_published: game.year_published,
          rules_url: game.rules_url,
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
      <input
        type='search'
        onChange={handleSearch}
        placeholder='Search Games'
      ></input>
      <ul>
        {searchResults.map((game) => (
          <li key={game.id}>
            <div className='info-left'>
              <h3>{game.name}</h3>
              <img src={game.image_url} alt={game.name} />
            </div>

            <div className='info-right'>
              <div>
                <p>
                  Players: {game.min_player} - {game.max_player}
                </p>
                <p>Year: {game.year_published}</p>
                <p>
                  Playtime: {game.min_playtime} - {game.max_playtime} min
                </p>
                <a href={game.rules_url}>Rules</a>
              </div>
              <button
                id={game.id}
                onClick={() => {
                  addToCollection(game);
                }}
              >
                Add to Collection
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
