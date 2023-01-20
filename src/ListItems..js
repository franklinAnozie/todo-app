import React from "react";

const ListItem = (props) => {
    return <li className="list-group-item">
    <button onClick={props.todoEdit} className="btn btn-primary mr-3" type="button">U</button>
    {props.todo.name}
    <button onClick={props.todoDelete} className="btn btn-danger ml-3" type="button">X</button>
    </li>
}
export default ListItem;