const EditTodo = () => {
  return <></>;
};
function Edit({ id }) {
  const putMethod = async () => {
    const input = window.prompt("Enter new description:");
    if (input) {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: input }),
      });

      window.location = "/";

      if (response.ok) {
        // If the request was successful, you can update the UI accordingly
        console.log("Todo updated successfully");
      } else {
        console.error("Failed to update todo:", response.statusText);
      }
    }
  };

  return (
    <button
      onClick={putMethod}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Edit
    </button>
  );
}

export default Edit;
