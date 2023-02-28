import { useEffect, useState } from 'react';
import '../styles/collection.scss';

function Collection(props) {
  const [collection, setCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const userId = parseInt(props.userId);
  const [collectionId, setCollectionId] = useState(userId);

  useEffect(() => {
    async function getCollection() {
      const response = await fetch(
        `http://localhost:5000/user/game?id=${collectionId}`
      );
      const data = await response.json();
      setCollection(data);
    }
    getCollection();
  }, [userId]);

  const deleteFromCollection = async (gameId, memberId) => {
    try {
      const response = await fetch('http://localhost:5000/user/game', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: gameId,
          memberId: memberId,
        }),
      });

      const result = await response;
      if (result.ok) {
        setCollection(collection.filter((item) => item.game_id !== gameId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRating = async (gameId, memberId, rating) => {
    try {
      const response = await fetch('http://localhost:5000/user/game', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: gameId,
          memberId: memberId,
          rating: parseInt(rating),
        }),
      });
      const result = await response;
      console.log(result);
      setCollection((prevCollection) =>
        prevCollection.map((item) => {
          if (item.game_id === gameId && item.member_id === memberId) {
            return {
              ...item,
              rating: parseInt(rating),
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (gameId, memberId, note) => {
    try {
      const response = await fetch('http://localhost:5000/user/game/note', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: gameId,
          memberId: memberId,
          note: note,
        }),
      });
      const result = await response;
      console.log(result);
      setCollection((prevCollection) =>
        prevCollection.map((item) => {
          if (item.game_id === gameId && item.member_id === memberId) {
            return {
              ...item,
              note: note,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCollection = collection.filter((item) =>
    item.game.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className='collection'>
      <div className='collection-grid'>
        <input
          type='text'
          placeholder='Search games'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {filteredCollection.length === 0 && <p>Your collection is empty</p>}
        {filteredCollection.map((item) => {
          {
            console.log(item);
          }
          return (
            <div className='collection-card' key={item.id}>
              <div className='del-button'>
                <button
                  onClick={() => {
                    deleteFromCollection(item.game_id, item.member_id);
                  }}
                >
                  Delete
                </button>
              </div>

              <div className='card'>
                <div className='info-left'>
                  <h3>{item.game}</h3>
                  <img src={item.game_image} />
                </div>
                <div className='info-middle'>
                  <p>
                    Players: {item.min_player} - {item.max_player}
                  </p>
                  <p>Year: {item.year_published}</p>
                  <p>
                    Playtime: {item.min_playtime} - {item.max_playtime} min
                  </p>
                  <p>
                    How to play:
                    <a href={item.rules_url} target='/'>
                      Guide
                    </a>
                  </p>
                </div>
                <div className='info-right'>
                  <label>Rating: </label>
                  <select
                    value={item.rating}
                    onChange={(e) =>
                      updateRating(item.game_id, item.member_id, e.target.value)
                    }
                  >
                    <option selected disabled>
                      Rating
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <p>Notes</p>
                  <textarea
                    value={item.note}
                    onChange={(e) => {
                      updateNote(item.game_id, item.member_id, e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Collection;
