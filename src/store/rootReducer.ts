import {combineReducers,} from "@reduxjs/toolkit";
import {todoApi} from "./TodoSlice.api";

const rootReducer = combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
})

export default rootReducer;