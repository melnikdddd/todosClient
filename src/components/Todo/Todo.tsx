import React, {ChangeEvent, FC, useState, memo} from 'react';
import {TasksList, ChildTodosList} from "./Lists";
import * as todoApi from "../../service/TodoService";
import LoadingBlock from "../LoadingBlock/LoadingBlock";

import styles from "./Todo.module.scss"
import {Id, ITodo} from "../../service/Interfaces";
import {findTodoById} from "../../lib/lib";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import {AddSubTodoButton, AddTaskButton, TodoInfoBlock, TodoInput} from "./Components";


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

    const {tasks, childrenId, parentsId} = todo;

    return (
        <div className={"flex flex-col items-center justify-center p-5"}>
            <TodoInfoBlock todo={todo}/>
            <div className={styles.buttonsWrap}>
                <TodoInput value={inputValue} onChange={handleInputChange}/>
                <AddTaskButton handleAddTaskClick={handleAddTaskClick}/>
                <AddSubTodoButton handleAddSubTodoClick={handleAddSubTodoClick}/>
            </div>
            <TasksList tasks={tasks} id={id}/>
            <ChildTodosList childrenId={childrenId} id={id}/>
        </div>
    );
};

export default memo(Todo);