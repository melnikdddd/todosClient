import React, {FC} from "react";
import styles from "./Todo.module.scss";

import {Id, Task} from "../../service/Interfaces";
import Todo from "./Todo";
import {useDeleteTaskMutation, useDeleteTodoByIdMutation} from "../../service/TodoService";



interface TasksListProps {
    id: Id,
    tasks: Task[];
}

export const TasksList: FC<TasksListProps> = ({tasks, id}) => {
    const [deleteTask] = useDeleteTaskMutation();

    const handleRemoveTask = async (index: number) => {
        await deleteTask({todoId: id, taskIndex: index});
    }

    return (
        <ul className={`bg-slate-200 rounded-lg ${tasks.length && `p-5 mt-5`} w-full`}>
            {tasks.map((task, index) => (
                <li key={index} className={"flex justify-between w-full items-center mt-2 "}>
                    <span>{task}</span>
                    <button onClick={()=> handleRemoveTask(index)}
                        className={"ml-2 bg-red-500 rounded-lg p-1"}>
                    Remove
                </button>
                </li>
            ))}

        </ul>
    )
}

interface TodoListProps {
    id: Id,
    childrenId: Id[];
}

export const ChildTodosList: FC<TodoListProps> = ({childrenId, id}) => {

    const [removeTodo] = useDeleteTodoByIdMutation();

    const handleRemoveTodo = async (id: Id, parentId: Id) => {
        await removeTodo({id, parentId});
    }


    return (
        <ul className={"flex flex-col w-full justify-around gap-x-5"}>
            {
                childrenId.map((todoId)=> (
                    <li key={todoId} className={"flex flex-col justify-center items-center"}>
                        <div className={"bg-slate-500 rounded-lg px-2 py-3 border border-slate-900 mt-5 flex flex-col items-center"}>
                            <Todo id={todoId}/>
                            <button className={"p-2 bg-red-500 rounded-lg"}
                                    onClick={() => handleRemoveTodo(todoId, id)}>
                                Remove todo {todoId}
                            </button>
                        </div>

                    </li>
                ))
            }
        </ul>
    )
}
