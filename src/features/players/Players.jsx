// Import the React library
// Import the generated hook from our RTK Query API slice
// Import the CSS styles for this component
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useFetchPlayersQuery} from '../../api/puppyBowlApi';
import '../../index.css';

// Define a new React component
// Use the generated hook to fetch data from the API
// When the component is first rendered, it will start the API fetch
// It will re-render each time the fetch status changes (e.g., "loading", "data arrived", "error")

const Players = () => {
    const { data = {}, error, isLoading } = useFetchPlayersQuery();

    
    // Show a loading message while data is being fetched
    if (isLoading) {
       return <div> Loading...</div>
    }
  
    // Show an error message if the fetch failed
    if (error) {
       return <div> Error fetching players: {error.message}</div>
    }
  
    // Show the fetched data after it has arrived
    return (
      <>
        <h1 style={{ textAlign: 'center' }}> Welcome to the PuppyBowl Event</h1>
        <div className="players">
        
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
            </div>
          ))}
        </div>
      </>
    );
  };
  
  // Export the component so it can be imported and used in other files
  export default Players;
  