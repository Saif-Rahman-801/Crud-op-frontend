import { useState } from "react";
import "./App.css";
import { Link, useLoaderData } from "react-router-dom";

function App() {
  const data = useLoaderData();
  const [userData, setUserData] = useState(data);

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    // POST api
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Added data");
        }
        // fetch("http://localhost:5000/users")
        //   .then((res) => res.json())
        //   .then((data) => setUserData(data));
      });
  };

  const handleDlt = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted Successfully");
          const remaining = userData.filter((user) => user._id !== id);
          setUserData(remaining);
        }
      });
  };

  // useEffect(() => {
  //   fetch("http://localhost:5000/users")
  //     .then((res) => res.json())
  //     .then((data) => setUserData(data));
  // }, []);
  return (
    <>
      <form onSubmit={handleForm}>
        <input type="text" name="name" id=""/>
        <br></br>
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {userData.map((user) => (
          <h4 key={user._id}>
            {user.name}
            <button onClick={() => handleDlt(user._id)}>X</button>
            <Link to={`/users/${user._id}`}> Update </Link>
          </h4>
        ))}
      </div>
    </>
  );
}

export default App;
