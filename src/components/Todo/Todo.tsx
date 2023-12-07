import React, {ChangeEvent, FC, useState, memo} from 'react';
import {TodoList, ChildTodosList} from "./Lists";
import * as TodoSlice from "../../store/slices/todoSlice";
import {useDispatch, useSelector} from "react-redux";


import styles from "./Todo.module.scss"


interface TodoInputProps {
    onChange: (value: string) => void;
    value: string;
}

const TodoInput: FC<TodoInputProps> = ({onChange, value}) => {
    return (
        <input className={"bg-slate-100 p-2"}
               type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
        />
    );
}

interface TodoButtonProps {
    handleAddTodoClick: () => void;
}

const AddTodoButton: FC<TodoButtonProps> = ({handleAddTodoClick}) => {
    return <button onClick={handleAddTodoClick} className={styles.todoButton}>
        Add Todo
    </button>
}

interface AddSubTodoButtonProps {
    handleAddSubTodoClick: () => void;
}

const AddSubTodoButton: FC<AddSubTodoButtonProps> = ({handleAddSubTodoClick}) => {
    return (
        <button onClick={handleAddSubTodoClick} className={"bg-green-500 hover:bg-green-400 rounded-lg"}>
            Add new todo list
        </button>
    )
}


interface TodoProps {
    id: number,
}

const Todo: FC<TodoProps> = ({id}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const dispatch = useDispatch();

    const handleInputChange = (value: string) => {
        setInputValue(value);
    }
    const handleAddTodoClick = () => {
        if(inputValue.length){
            setInputValue("");
            dispatch(TodoSlice.addTodo({id, str: inputValue}));
        }

    }


    return (
        <div className={"flex flex-col items-center justify-center"}>
            <div className={styles.buttonsWrap}>
                <TodoInput value={inputValue} onChange={handleInputChange}/>
                <AddTodoButton handleAddTodoClick={ handleAddTodoClick}/>
                <AddSubTodoButton handleAddSubTodoClick={() => dispatch(TodoSlice.addChildTodos({id}))}/>
            </div>
            <TodoList id={id}/>
            <ChildTodosList id={id}/>
        </div>
    );
};

export default memo(Todo);