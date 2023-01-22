import axios from "axios";
import Alerting from "./alert";

let addTodo = async (url, todo, value, setTodo, setValue, setAlert) => {
    const resp = await axios.post(`${url}/TododApp`, {
      name: value
    });
    const todos = todo;
    todos.push(resp.data);
    setTodo(todos);
    setValue("");
    Alerting("Added Todo Successfully", setAlert);
};

export default addTodo;