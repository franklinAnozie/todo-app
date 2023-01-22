import React , {useState} from 'react';

import ResourceList from './resourceList1';

const App = () => {

    const [resources, setResources] = useState("todos");

    return (
        <>
            <button onClick={() => setResources("posts")}>Posts</button>
            <button onClick={() => setResources("todos")}>Todos</button>
            <ResourceList resourceName={resources}/>
        </>
    );
}

export default App;