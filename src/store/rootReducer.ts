import {combineReducers,} from "@reduxjs/toolkit";
import TodoReducer from "./slices/todoSlice";
import {todoApi} from "../service/TodoService";

const rootReducer = combineReducers({
    todo: TodoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
})

export default rootReducer;