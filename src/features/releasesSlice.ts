import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const releasesSlice = createSlice({
    name: "releases",
    initialState: {
        releases: [],
    },
    reducers: {
        setReleases: (state, action: PayloadAction<any>) => {
            state.releases = action.payload
        },
    }
})

export const { setReleases } = releasesSlice.actions
export default releasesSlice.reducer