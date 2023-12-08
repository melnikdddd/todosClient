import {ITodo, Id} from "../service/Interfaces";

export const findTodoById = (todos: ITodo[], id: Id): ITodo | undefined => todos.find(todo => todo.id === id);


