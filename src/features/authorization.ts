import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authorization = createSlice({
    name: "auth",
    initialState: {
        token: "",
    },
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        removeToken: (state, action: PayloadAction<string>) => {
            state.token = ""
        }
    }
})

export const { setToken, removeToken } = authorization.actions
export default authorization.reducer