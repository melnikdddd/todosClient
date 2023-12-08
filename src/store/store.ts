import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {compose} from "@reduxjs/toolkit";
import {todoApi} from "./TodoSlice.api";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;