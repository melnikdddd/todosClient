import React from 'react';
import Todo from "./components/Todo/Todo";
import {useFetchAllTodosQuery} from "./store/TodoSlice.api";
import LoadingBlock from "./components/LoadingBlock/LoadingBlock";
import {findTodoById} from "./lib/lib";
import ErrorBlock from "./components/ErrorBlock/ErrorBlock";


function App() {
    const {data: todos, error, isLoading} = useFetchAllTodosQuery();


    if (!todos || error) {
        return <ErrorBlock errorStr={'Server error.'}/>
    }

    const rootTodoId = findTodoById(todos, 1)?.id;
    if (!rootTodoId) {
        return <ErrorBlock errorStr={'Cant find root todo'}/>
    }

    return (
        <div className={"w-screen min-h-screen bg-gray-800 flex items-start justify-start p-2"}>
            <div className={"flex justify-center items-center w-full"}>
                {isLoading ? <LoadingBlock/>
                    :
                    <div className={"bg-slate-600 rounded-lg"}>
                        <Todo id={rootTodoId}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
