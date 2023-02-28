import { useEffect, useState } from 'react';

function Search() {
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
          thumbnail: game.thumb_url,
        }));

        setSearchResults(searchResults);
      } catch (error) {
        console.error(error);
      }
    }

    searchGames();
  }, [searchTerm]);

  return (
    <div className='search'>
      <input type='search' onChange={handleSearch} placeholder='search'></input>
      <h1>Search results for {searchTerm}</h1>
      <ul>
        {searchResults.map((game) => (
          <li
            key={game.id}
            id={game.id}
            onClick={(e) => console.log(e.target.id)}
          >
            <img src={game.thumbnail} alt={game.name} />
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
