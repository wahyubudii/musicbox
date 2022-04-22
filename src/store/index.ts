import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../features/accountSlice";
import authorization from "../features/authorization";
import playlisstSlice from "../features/playlistSlice";
import releaseSlices from "../features/releasesSlice";
import topItemsSlices from "../features/topItemsSlices";
import tracksSlice from "../features/tracksSlice";

const store = configureStore<any>({
    reducer: {
        token: authorization,
        account: accountSlice,
        tracks: tracksSlice,
        playlists: playlisstSlice,
        releases: releaseSlices,
        topItems: topItemsSlices
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store