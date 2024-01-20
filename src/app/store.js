import { configureStore } from '@reduxjs/toolkit';
import { puppyBowlApi } from '../api/puppyBowlApi';

// Create a Redux store
const store = configureStore({
    
    reducer: {
        [puppyBowlApi.reducerPath]: puppyBowlApi.reducer,
      
    },
  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(puppyBowlApi.middleware),
      
  });
  
  export default store