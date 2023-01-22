import {useState, useEffect} from 'react';
import axios from 'axios';
import ListItem from './ListItems.';
import logo from './logo.svg';
import addTodo from "./components/addTodo";
import deleteTodo from "./components/deleteTodo";
import editTodo from "./components/editTodo";
import updateTodo from "./components/updateTodo";
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [alert, setAlert] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const url = "https://5b68d401629e280014570d71.mockapi.io";

  useEffect(()=> {
    (async () => {
      const repl = await axios.get(`${url}/TododApp`);
      setTodo(repl.data);
    })();
  }, []);

  let handleChange = (evt) => {
    setValue(evt.target.value);
    evt.preventDefault();
  };

  let validate = () => {
    const newTodos = value;
    return newTodos.length < 5 ? true : false;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">my new crud app</h1> 
      </header>
      <div className="container">
        {alert && (
          <div className="alert alert-success mt-4">
            <p className="text-center">{alert}</p>
          </div>
        )}
        <input
          type="text"
          name="todo"
          className="my-4 form-control"
          onChange={handleChange}
          onKeyUp={(e)=>{
            console.log(e);
            if(e.key === "Enter"){
              if(editing){
                updateTodo(url, todo, value, editingIndex, setTodo, setEditing, setValue, setEditingIndex, setAlert);
              } else {
                addTodo(url, todo, value, setTodo, setValue, setAlert)
              } 
            }
          }}
          placeholder="add new todo"
          value={value}
        />
        <button
          className="btn btn-info my-3 form-control"
          type="button"
          onClick={editing ? () => updateTodo(url, todo, value, editingIndex, setTodo, setEditing, setValue, setEditingIndex, setAlert) : () => addTodo(url, todo, value, setTodo, setValue, setAlert)}
          disabled={validate()}>
          {editing ? "update todo" : "add todo"}
        </button>
        {!editing && (
          <ul className="list-group">
            {todo.map((a, index) => {
              return (
                <ListItem
                  key={a.id}
                  todo={a}
                  todoEdit={()=>{editTodo(index, setEditing, setEditingIndex, setAlert)}}
                  todoDelete={()=>{deleteTodo(index, url, todo, setTodo, setAlert)}}
                />
              )
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;