import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {Id, Task} from "../store/slices/todoSlice";

interface AddTodoParams {
    parentId: Id;
    parentsId: Id[];
}
interface AddTaskParams {
    task: Task;
    todoId: Id;
}

interface RemoveTaskParams {
    taskIndex: number;
    todoId: Id;
}



export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/todos'}),
    endpoints: (build) => ({
        fetchAllTodos: build.query({
            query: () => ({
                url: '/'
            })
        }),
        addTodo: build.mutation({
            query: ({parentsId, parentId}: AddTodoParams) => ({
                url: `/`,
                method: 'POST',
                body: {parentId, parentsId}
            })
        }),
        fetchTodoById: build.query({
            query: (id: Id) => ({
                url: `/:${id}`
            })
        }),
        deleteTodoById: build.mutation({
            query: (id: Id) => ({
                url: `/:${id}`,
                method: 'DELETE'
            })
        }),
        addTask: build.mutation({
            query: ({todoId, task} : AddTaskParams) => ({
                url: `/${todoId}/tasks`,
                method: 'POST',
                body: {task}
            })
        }),
        removeTask: build.mutation({
            query: ({todoId, taskIndex}: RemoveTaskParams) => ({
                url: `/${todoId}/tasks?taskIndex=${taskIndex}`,
                method: 'DELETE',
            })
        })
    })
})