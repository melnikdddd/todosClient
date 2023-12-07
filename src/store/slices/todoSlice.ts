import {createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {find} from "@reduxjs/toolkit/dist/utils";

export type Task = string;
export type Tasks = Array<Task>;
export type Id = number;



export interface ITodo {
    id: Id;
    tasks: Tasks;
    parentsId: Id[];
    children: Id[];
}


const initialState: {} = {
}

const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

    }
});


export default TodoSlice.reducer;