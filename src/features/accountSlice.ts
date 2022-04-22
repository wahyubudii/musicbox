import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { Account } from "../models/Account";
import { RootState } from "../store";

export const getAccount = createAsyncThunk("account/getAccount", async (token: string) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return { data }
})

const accountEntity = createEntityAdapter<Account>({
    selectId: (account) => account.id
})

const accountSlice = createSlice({
    name: "account",
    initialState: accountEntity.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAccount.fulfilled, (state, action) => {
            accountEntity.setAll(state, action.payload)
        })
    }
})

export const accountSelectors = accountEntity.getSelectors((state: RootState) => state.account)
export default accountSlice.reducer