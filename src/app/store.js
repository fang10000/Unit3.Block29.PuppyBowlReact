// Import configureStore (function to create a Redux store with good default middleware settings) from Redux Toolkit
// Import the API service we defined (which includes the API endpoints and the reducer)

import { configureStore } from '@reduxjs/toolkit';
import playersReducer from "../features/players/Players";
import { puppyBowlApi } from '../api/puppyBowlApi';

// Create a Redux store
const store = configureStore({
    // Define the reducer for the store
    // We are adding the API service's reducer to our Redux store's reducer.
    // This means the API service's actions will be dispatched to the API service's reducer.
    reducer: {
        [puppyBowlApi.reducerPath]: puppyBowlApi.reducer,
        players: playersReducer
      // The key is the reducerPath we defined in our API service, and the value is the reducer
    },
    // Add any additional middleware
    // getDefaultMiddleware is a function that returns the default middleware used by Redux Toolkit
    // We're concatenating our API service's middleware to the array of default middleware
    // This means that when we dispatch an action, the API service's middleware will have a chance to handle it
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
      
  });
  
  export default store