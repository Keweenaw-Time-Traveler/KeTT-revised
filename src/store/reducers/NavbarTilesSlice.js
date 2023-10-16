import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tilesView: true,
}

const NavbarTilesSlice = createSlice({
    name: "navbarTiles",
    initialState,
    reducers: {
        setTilesView: (state) => {
            console.log(state);
            state.tilesView = !state.tilesView;
        },
    },
})

export const { setTilesView } = NavbarTilesSlice.actions;

export default NavbarTilesSlice.reducer;