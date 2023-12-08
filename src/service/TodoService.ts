import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {Id, ITodo, Task} from "./Interfaces";

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

interface DeleteTodoParams {
    id: Id,
    parentId: Id
}

interface UpdateTaskParams {
    todoId: Id;
    taskIndex: number;
    task: Task;
}

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/todos'}),
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        fetchAllTodos: build.query<ITodo[], void>({
            query: () => ({
                url: '/'
            }),
            providesTags: ['Todo'],
        }),
        addTodo: build.mutation<ITodo, AddTodoParams>({
            query: ({parentId, parentsId,}: AddTodoParams) => ({
                url: `/`,
                method: 'POST',
                body: {parentId, parentsId}
            }),
            invalidatesTags: ['Todo'],
        }),
        fetchTodoById: build.query<ITodo, Id>({
            query: (id: Id) => ({
                url: `/${id}`
            }),
            providesTags: ['Todo'],
        }),
        deleteTodoById: build.mutation<boolean, DeleteTodoParams>({
            query: ({id, parentId}: DeleteTodoParams) => ({
                url: `/${id}?parentId=${parentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo'],
        }),
        addTask: build.mutation<ITodo, AddTaskParams>({
            query: ({todoId, task}: AddTaskParams) => ({
                url: `/${todoId}/tasks`,
                method: 'POST',
                body: {task}
            }),
            invalidatesTags: ['Todo'],
        }),
        deleteTask: build.mutation<ITodo, RemoveTaskParams>({
            query: ({todoId, taskIndex}: RemoveTaskParams) => ({
                url: `/${todoId}/tasks?taskIndex=${taskIndex}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),
        updateTask: build.mutation<ITodo, UpdateTaskParams>({
            query: ({todoId, taskIndex, task}: UpdateTaskParams) => ({
                url: `/${todoId}/tasks?taskIndex=${taskIndex}`,
                method: 'PUT',
                body: {task},
            }),
            invalidatesTags: ['Todo'],
        })
    }),
})

export const {
    useFetchAllTodosQuery,
    useAddTaskMutation,
    useAddTodoMutation,
    useDeleteTodoByIdMutation,
    useFetchTodoByIdQuery,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} = todoApi


