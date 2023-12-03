function Todo(props) {

    const todo = props.todo;
    const deleteTodo = props.deleteTodo;

    return (
        <div className="todo">
            <h3>{ todo.name }</h3>
            <p>Created at: { todo.time }</p>
            <p>{ todo.description }</p>
            <button onClick={ () => deleteTodo(todo.id) }>Delete</button>
         </div>
    );

}

export default Todo;