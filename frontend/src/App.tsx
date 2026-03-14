import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);


// [ '127.0.0.53' ]
  return (
    <div>
      <h1>MERN Stack App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;