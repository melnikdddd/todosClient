import React, {FC} from "react";
import styles from "./Todo.module.scss";

import {ChildTodos, removeTodo, removeChildTodos, selectChildTodos, selectTodos} from "../../store/slices/todoSlice";
import Todo from "./Todo";
import {useDispatch, useSelector} from "react-redux";
import todo from "./Todo";


interface TodoListProps {
    id: number;
}

export const TodoList: FC<TodoListProps> = ({id}) => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos(id))
    if (!todos) {
        return (
            <p>

            </p>
        )
    }
    return (
        <ul className={styles.todoList}>
            {
                todos.map((todo, index) => (
                    <li key={index} className={"flex justify-center py-2"}>
                        <span>{todo}</span>
                        <button onClick={() => dispatch(removeTodo({id, strIndex: index}))}
                                className={"bg-red-500 hover:bg-red-600 transition-colors p-2 rounded-lg ml-2"}>
                            Remove
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

export const ChildTodosList: FC<TodoListProps> = ({id}) => {
    const dispatch = useDispatch();
    const childTodos = useSelector(selectChildTodos(id));


    return (
        <ul>
            {
                childTodos.map((subTodo, index) => (
                    <li key={index} className={"flex justify-around items-center gap-x-5"}>
                        <button onClick={() => dispatch(removeChildTodos({id: index}))}
                                className={"bg-red-500 hover:bg-red-400 transition-colors p-2 rounded-lg mt-2"}>
                            Remove Todo
                        </button>
                        <Todo id={subTodo.id} />
                    </li>
                ))
            }
        </ul>
    )
}
