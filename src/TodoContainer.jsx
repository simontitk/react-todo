import { useState, useEffect } from "react";
import Todo from "./Todo";

function TodoContainer() {

    const days = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thrusday", 4:"Friday", 5: "Saturday", 6: "Sunday"}
    const todoFromStorage = JSON.parse(localStorage.getItem("todoList"));
    const [todoList, setTodoList] = useState((todoFromStorage)? todoFromStorage : []);
    const [todoNameInput, setTodoNameInput] = useState("");
    const [todoDescInput, setTodoDescInput] = useState("");


    function deleteTodo(id) {
        let filteredList = todoList.filter((todo) => todo.id !== id);
        setTodoList(filteredList);      
    }


    function createTodo() {
        const time = new Date();
        if (!todoNameInput) {
            alert("Please specify a task name first!")
        }
        else {
            let newTodo = { id: crypto.randomUUID(),
                            name: todoNameInput, 
                            description: todoDescInput,
                            time: `${days[time.getDay()]}, ${time.toLocaleTimeString()}`};

            setTodoList([newTodo, ...todoList]);
            setTodoNameInput("");
            setTodoDescInput("");
        }
    }

    useEffect(() => localStorage.setItem("todoList", JSON.stringify(todoList)), [todoList]);

    return (
        <>
            <div className="todoCreator">
                <h1>Create a new task</h1>

                <label htmlFor="todoNameInput">Name of the task:</label>
                <input type="text"
                    id="todoNameInput" 
                    value={todoNameInput} 
                    onChange={(e) => (setTodoNameInput(e.target.value))}/>

                <label htmlFor="todoDescInput">Description of the task:</label>
                <textarea
                    id="todoDescInput"
                    value={todoDescInput} 
                    onChange={(e) => (setTodoDescInput(e.target.value))}/>

                <button onClick={() => createTodo()}>Add to list</button>
                <h2>{(todoList.length > 0) ? "Current tasks:": "No tasks currently."}</h2>
            </div>

            <div className="todoList">
                {todoList.map((todo) => <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo}></Todo>)}
            </div>
        </>
    );
}

export default TodoContainer;