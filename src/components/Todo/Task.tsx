import React, {FC, useState} from 'react';
import {Task} from "../../service/Interfaces";
import styles from "./Todo.module.scss";


interface TaskComponentProps {
    task: Task
    index: number,
    handleRemoveTask: (index: number) => void;
    handleUpdateTask: (value: string, index: number) => Promise<void>;
}

const TaskComponent: FC<TaskComponentProps> = ({task, index, handleRemoveTask, handleUpdateTask}) => {
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(task);

    const handleEditTaskClick = async () => {
        if (!isEdited) {
            setIsEdited(true);
            return;
        }
        setIsEdited(false);
        await handleUpdateTask(inputValue, index);
    }
    const handleInputChange = (value: string) => {
        setInputValue(value);
    }


    return (
        <div className={"flex justify-between w-full items-center my-2 pb-2 border-b border-slate-400"}>
            {
                isEdited ?
                    <input onChange={(event) => handleInputChange(event.target.value)}
                           type="text" value={inputValue} className={"bg-transparent focus:outline-none w-2/3"}/>
                    :
                    <span>{task}</span>
            }
            <div>
                <button onClick={handleEditTaskClick}
                        className={`${isEdited ? styles.taskSaveButton : styles.taskEditButton}`}>
                    {isEdited ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => isEdited ? setIsEdited(false) : handleRemoveTask(index)}
                        className={"ml-2 bg-red-500 rounded-lg p-1 transition-colors hover:bg-red-600"}>
                    {isEdited ? 'Cancel' : 'Remove'}
                </button>
            </div>
        </div>
    );
};

export default TaskComponent;