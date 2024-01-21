import React, { useState, useEffect } from 'react';
import { useFetchPlayersQuery } from '../../api/puppyBowlApi';

import Search from '../search/Search';
import AddPlayerForm from '../addPlayer/AddPlayerForm';
import Player from '../drawer/Player';
import Delete from '../delete/Delete';

import '../../index.css';

const Players = () => {

  const [players, setPlayers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const { data: fetchedData, error, isLoading } = useFetchPlayersQuery(searchValue);

  // Initialize the data state
  const [data, setData] = useState({ data: { players: [] } });

  // Update the data state when fetchedData changes
  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

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
        // Update the local players state
        setPlayers((prevPlayers) => [...prevPlayers, newPlayerData]);
  
        // Update the data object used for rendering the players
        // Assuming data object has the same structure as your current usage
        setData((prevData) => ({
          ...prevData,
          data: {
            ...prevData.data,
            players: [...prevData.data.players, newPlayerData],
          },
        }));
  
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

  const handlePlayerDetailsClick = (player) => {
    setSelectedPlayer(player);
  };

  // Show a loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show an error message if the fetch failed
  if (error) {
    return <div>Error fetching players: {error.message}</div>;
  }

  // Filter players based on search value
  const filteredPlayers = searchValue
    ? data?.data?.players.filter((player) =>
        player.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : data?.data?.players;

  return (
    <>
      <div>
        <Search setSearchValue={setSearchValue} />
      </div>
      <div className="players">
        <div className="player-card">
          <AddPlayerForm onAddPlayer={handleAddPlayer} setPlayers={setPlayers} />
        </div>

        {/* Map through the filtered players array */}
        {filteredPlayers.map((player) => (
          // Use the player's ID as the key for this div
          <div key={player.id} className="player-card">
            <img src={player.imageUrl} alt={player.name} className="player-image" />

            <div className="player-details">
              <h2> {player.name} </h2>
              <p> {player.breed} </p>
              <p> {player.status} </p>
            </div>
            <Player player={player} onDetailsClick={handlePlayerDetailsClick} />
            <Delete playerId={player.id} onDeleteSuccess={handleDeletePlayer} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Players;

  