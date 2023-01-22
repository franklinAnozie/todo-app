import Alerting from "./alert";

let editTodo = (index, setEditing, setEditingIndex, setAlert) => {
    setEditing(true);
    setEditingIndex(index);
    Alerting("You can now edit your Todo", setAlert);
};

export default editTodo