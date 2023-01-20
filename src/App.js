import {useState, useEffect} from 'react';
import axios from 'axios';
import ListItem from './ListItems.';
import logo from './logo.svg';
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

  let addTodo = async () => {
    const resp = await axios.post(`${url}/TododApp`, {
      name: value
    });
    const todos = todo;
    todos.push(resp.data);
    setTodo(todos);
    setValue("");
    Alerting("Added Todo Successfully");
  };

  let deleteTodo = async (index) => {
    const deleteFrom = todo;
    const todos = deleteFrom[index];
    await axios.delete(`${url}/TododApp/${todos.id}`);
    delete deleteFrom[index];
    setTodo(deleteFrom);
    Alerting("Deleted Todo Successfully");
  };

  let editTodo = (index) => {
    setEditing(true);
    setEditingIndex(index);
    Alerting("You can now edit your Todo");
  };

  let updateTodo = async (index) => {
    const todos = todo[editingIndex];
    const resp = await axios.put(`${url}/TododApp/${todos.id}`, {
      name: value
    });
    const editingTodo = todo;
    editingTodo[editingIndex] = resp.data;
    setTodo(editingTodo);
    setEditingIndex(null);
    setValue("");
    setEditing(false);
    Alerting("Updated Todo Successfully");
  };

  let Alerting = (alert) => {
    setAlert(alert);
    setTimeout(()=>{
      return setAlert(null);
    }, 1000);
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
          placeholder="add new todo"
          value={value}
        />
        <button
          className="btn btn-info my-3 form-control"
          type="button"
          onClick={editing ? updateTodo : addTodo}
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
                  todoEdit={()=>{editTodo(index)}}
                  todoDelete={()=>{deleteTodo(index)}}
                />
              );
            })};
          </ul>
        )};
      </div>
    </div>
  );
};

export default App;