import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const topItemsSlices = createSlice({
    name: "topItems",
    initialState: {
        topTracks: [],
        topArtists: [],
    },
    reducers: {
        setTopTracks: (state, action: PayloadAction<any>) => {
            state.topTracks = action.payload
        },
        setTopArtists: (state, action: PayloadAction<any>) => {
            state.topArtists = action.payload
        },
    }
})

export const { setTopTracks, setTopArtists } = topItemsSlices.actions
export default topItemsSlices.reducer