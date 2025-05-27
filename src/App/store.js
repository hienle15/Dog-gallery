import {configureStore} from '@reduxjs/toolkit';
import breedReducer from '../features/breeds/breedsSlice';
import dogsReducer from '../features/dogs/dogsSlice';
import favoritesReducer from '../features/dogs/favoritesSlice';

export const store = configureStore({
    reducer: {
        breeds: breedReducer,
        dogs: dogsReducer,
        favorites: favoritesReducer
    }
});

export default store;