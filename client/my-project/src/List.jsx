import Edit from "./Edit";
import Delete from "./Delete";

function List({ data, setData }) {
  return (
    <div className="border rounded-lg shadow-md w-full max-w-lg mx-auto mt-5 p-4">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((each) => (
          <div
            key={each.todo_id}
            className="flex items-center justify-between border-b py-3"
          >
            <h1 className="text-lg font-semibold">{each.description}</h1>
            <div className="flex gap-1">
              <Edit id={each.todo_id} />
              <Delete id={each.todo_id} setData={setData} data={data} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
}

export default List;
