import React from 'react';
import Todo from "./components/Todo/Todo";


function App() {
  return (
      <div className={"flex justify-center items-center w-full"}>
        <Todo id={0} />
      </div>
  );
}

export default App;
