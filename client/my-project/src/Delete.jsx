function Delete({ id, setData, data }) {
  const deleteMethod = async () => {
    // window.location = "/";
    const deleteList = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    setData(data.filter((each) => each.todo_id !== id));
  };

  return (
    <button
      onClick={() => deleteMethod()}
      className="px-3 py-1 bg-red-500 text-white rounded   hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      delete
    </button>
  );
}

export default Delete;
