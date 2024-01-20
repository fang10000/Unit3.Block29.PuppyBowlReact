import React from 'react';
import { useState} from 'react';
import { useFetchPlayersQuery} from '../../api/puppyBowlApi';
import Player from '../drawer/Player';
import Delete from '../delete/Delete';
import AddPlayerForm from '../addPlayer/AddPlayerForm'
import Search from '../search/Search';
import '../../index.css';


const Players = () => {
    const [searchValue, setSearchValue] = useState('');
    const { data = {}, error, isLoading } = useFetchPlayersQuery(searchValue);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [players, setPlayers] = useState([]);
    
    const handleAddPlayer = async (newPlayerData) => {
      try {
        const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2310-UNF-HY-WEB-PT/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayerData),
        });
  
        if (response.ok) {
          // Update the state to include the newly added player
          setPlayers((prevPlayers) => [...prevPlayers, newPlayerData]);
          console.log('Player added successfully');
        } else {
          console.error('Error adding player');
        }
      } catch (error) {
        console.error('Network error during add operation', error);
      }
    };
    
    
    const handleDeletePlayer = async (playerId) => {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-UNF-HY-WEB-PT/players/${playerId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // Update the state to remove the deleted player
          setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
          console.log(`Player with ID ${playerId} deleted successfully`);
        } else {
          console.error(`Error deleting player with ID ${playerId}`);
        }
      } catch (error) {
        console.error('Network error during delete operation', error);
      }
    };
    
    // Show a loading message while data is being fetched
    if (isLoading) {
       return <div> Loading...</div>
    }
  
    // Show an error message if the fetch failed
    if (error) {
       return <div> Error fetching players: {error.message}</div>
    }
  
    const handlePlayerDetailsClick = (player) => {
      setSelectedPlayer(player);
    }

    // Show the fetched data after it has arrived
    return (
      <>
        <div>
          <Search setSearchValue={setSearchValue} />
        </div>
        <div className="players">
          <div className='player-card'>
          {/* call AddPlayerForm.jsx */}
          <AddPlayerForm onAddPlayer={handleAddPlayer} />
          </div>
        
          {/* Map through the data array and generate a div for each player */}
          {data && data.data.players.map((player) => (
            // Use the player's ID as the key for this div
            <div key={player.id} className="player-card">
              <img src={player.imageUrl} alt={player.name} className="player-image" />
              
              <div className="player-details">
                <h2>  {player.name} </h2> 
                <p>  {player.breed} </p> 
                <p> {player.status} </p>
              </div>
              <Player player={player} onDetailsClick={handlePlayerDetailsClick}/>
              <Delete playerId={player.id} onDeleteSuccess={handleDeletePlayer} />
            </div>
          ))}
        </div>
      </>
    );
  };
  
  // Export the component so it can be imported and used in other files
  export default Players;