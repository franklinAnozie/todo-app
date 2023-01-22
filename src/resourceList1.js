import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ResourceList = (props) => {
  const [resource, setResource] = useState([])
  
  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/${props.resourceName}`)
      setResource(response.data)
    })()  
  }, [props]);

  return (
    <ul>
      {resource.map(res => (
        <li key={res.id}>{res.title}</li>
      ))}
    </ul>
  )
}

export default ResourceList;