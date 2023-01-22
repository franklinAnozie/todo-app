import axios from "axios";
import Alerting from "./alert";

let deleteTodo = async (index, url, todo, setTodo, setAlert) => {
    const deleteFrom = todo;
    const todos = deleteFrom[index];
    await axios.delete(`${url}/TododApp/${todos.id}`);
    delete deleteFrom[index];
    setTodo(deleteFrom);
    Alerting("Deleted Todo Successfully", setAlert);
};

export default deleteTodo;