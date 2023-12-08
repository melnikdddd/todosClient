import React, {FC} from "react";
import styles from "./Todo.module.scss";
import {ITodo} from "../../service/Interfaces";

interface AddTodoButtonProps {
    handleAddTaskClick: () => void;
}

export const AddTaskButton: FC<AddTodoButtonProps> = ({handleAddTaskClick}) => {
    return <button onClick={handleAddTaskClick} className={styles.todoButton}>
        Add task
    </button>
}


interface AddSubTodoButtonProps {
    handleAddSubTodoClick: () => void;
}

export const AddSubTodoButton: FC<AddSubTodoButtonProps> = ({handleAddSubTodoClick}) => {
    return (
        <button onClick={handleAddSubTodoClick} className={styles.todoButton}>
            Add new todo list
        </button>
    )
}

interface TodoInputProps {
    onChange: (value: string) => void;
    value: string;
}

export const TodoInput: FC<TodoInputProps> = ({onChange, value}) => {
    return (
        <input className={"bg-slate-100 p-2 rounded-lg focus:outline-blue-700 focus:outline-1"}
               type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
        />
    );
}


interface TodoInfoBlock {
 todo: ITodo;
}

export const TodoInfoBlock: FC<TodoInfoBlock> = ({todo}) => {
    const {id, childrenId, parentsId, tasks} = todo;

    return (
        <div className={"w-full flex justify-center text-white mb-1"}>
            <span>Id: {id}</span>
            <span className={"ml-2"}>| Children count: {childrenId.length}</span>
            <span className={"ml-2"}>| Tasks count: {tasks.length}</span>
            {parentsId[parentsId.length - 1] !== 0 &&
                <span className={"ml-2"}>| Parent id: {parentsId[parentsId.length - 1]}</span>
            }
        </div>
    )
}

