import "./App.css";

function App() {
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
      });
  };
  return (
    <>
      <form onSubmit={handleForm}>
        <input type="text" name="name" id="" />
        <br></br>
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
