import { useLoaderData } from "react-router-dom";

const UpdateForm = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log(updatedUser);
    fetch(`http://localhost:5000/users/${loadedData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
    });
  };
  return (
    <div>
      <form onSubmit={handleForm}>
        <input type="text" name="name" id="" defaultValue={loadedData?.name} />
        <br></br>
        <input type="email" name="email" id="" defaultValue={loadedData?.email} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateForm;
