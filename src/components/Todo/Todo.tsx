import React, {ChangeEvent, FC, useState, memo} from 'react';
import {TasksList, ChildTodosList} from "./Lists";
import * as todoApi from "../../service/TodoService";
import LoadingBlock from "../LoadingBlock/LoadingBlock";

import styles from "./Todo.module.scss"
import {Id, ITodo} from "../../service/Interfaces";
import {findTodoById} from "../../lib/lib";
import ErrorBlock from "../ErrorBlock/ErrorBlock";


interface TodoInputProps {
    onChange: (value: string) => void;
    value: string;
}

const TodoInput: FC<TodoInputProps> = ({onChange, value}) => {
    return (
        <input className={"bg-slate-100 p-2 rounded-lg "}
               type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
        />
    );
}

interface TodoButtonProps {
    handleAddTaskClick: () => void;
}

const AddTaskButton: FC<TodoButtonProps> = ({handleAddTaskClick}) => {
    return <button onClick={handleAddTaskClick} className={styles.todoButton}>
        Add task
    </button>
}

interface AddSubTodoButtonProps {
    handleAddSubTodoClick: () => void;
}

const AddSubTodoButton: FC<AddSubTodoButtonProps> = ({handleAddSubTodoClick}) => {
    return (
        <button onClick={handleAddSubTodoClick} className={styles.todoButton}>
            Add new todo list
        </button>
    )
}

interface TodoProps {
    id: Id;
}

const Todo: FC<TodoProps> = ({id}) => {
    const {data: todos, error, isLoading} = todoApi.useFetchAllTodosQuery();
    const [inputValue, setInputValue] = useState<string>("");
    const [isTodoShow, setIsTodoShow] = useState<boolean>(false);

    const [addTodo] = todoApi.useAddTodoMutation();
    const [addTask] = todoApi.useAddTaskMutation();

    if (isLoading) {
        return <LoadingBlock/>
    }
    if (error || !todos) {
        return <ErrorBlock errorStr={"Server or todos"}/>
    }

    const todo = findTodoById(todos, id);

    if (!todo) {
        return <ErrorBlock errorStr={"Todo cant find"}/>
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
    }
    const handleAddTaskClick = async () => {
        if (inputValue.length) {
            await addTask({todoId: id, task: inputValue});
            setInputValue("");
        }
    }

    const handleAddSubTodoClick = async () => {
        await addTodo({parentId: id, parentsId: parentsId});
    }

    const {childrenId, tasks, parentsId} = todo;

    return (
        <div className={"p-5"}>
            <div className={"flex flex-col items-center justify-center "}>
                <div className={"w-full flex justify-center text-white"}>
                    <span>Id: {id}</span>
                    <span className={"ml-2"}>| Children count: {childrenId.length}</span>
                    <span className={"ml-2"}>| Tasks count: {tasks.length}</span>
                    { parentsId[parentsId.length - 1] !== 0 &&
                    <span className={"ml-2"}>| Parent id: {parentsId[parentsId.length - 1]}</span>
                }
                </div>
                <div className={styles.buttonsWrap}>
                    <TodoInput value={inputValue} onChange={handleInputChange}/>
                    <AddTaskButton handleAddTaskClick={handleAddTaskClick}/>
                    <AddSubTodoButton handleAddSubTodoClick={handleAddSubTodoClick}/>
                </div>
                <TasksList tasks={tasks} id={id}/>
                <ChildTodosList childrenId={childrenId} id={id}/>
            </div>
        </div>

    );
};

export default memo(Todo);