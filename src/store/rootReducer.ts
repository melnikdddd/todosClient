import {combineReducers,} from "@reduxjs/toolkit";
import {todoApi} from "../service/TodoService";

const rootReducer = combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
})

export default rootReducer;