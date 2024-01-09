// Import the React library, which allows us to define components
// Import the Players component, which we'll use to show a list of players
import React from 'react';
import Players from './features/players/Players';


// Define the App component
// This component renders the Players component inside a div
// This div has a class of 'App', which we could use for styling

function App() {
  return (
     <div className="App">
        <Players />
     </div>
  );
}

// Export the App component as the default export
export default App
