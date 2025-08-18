const { createSlice } = require("@reduxjs/toolkit");

const initialState ={
    favourites: [],
}

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addFavourite: (state, action) => {
            state.favourites.push(action.payload);
        },
        removeFavourite: (state, action) => {
            state.favourites = state.favourites.filter(fav => fav.id !== action.payload.id);
        },
        clearFavourites: (state) => {
            state.favourites = [];
        }
    }
});

export const { addFavourite, removeFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;