import axios from "axios";
import Alerting from "./alert";

let updateTodo = async (url, todo, value, editingIndex, setTodo, setEditing, setValue, setEditingIndex, setAlert) => {
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
    Alerting("Updated Todo Successfully", setAlert);
};

export default updateTodo;