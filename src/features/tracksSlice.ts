import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tracksSlice = createSlice({
    name: "tracks",
    initialState: {
        tracks: [],
        artists: []
    },
    reducers: {
        setTracks: (state, action: PayloadAction<any>) => {
            state.tracks = action.payload
        },
        setArtists: (state, action: PayloadAction<any>) => {
            state.artists = action.payload
        },
    }
})

export const { setTracks, setArtists } = tracksSlice.actions
export default tracksSlice.reducer