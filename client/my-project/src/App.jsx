import { useState, useEffect } from "react";
import AddData from "./AddData";
import List from "./List";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch("http://localhost:5000/todos");
        const dataWeGot = await resp.json();
        setData(dataWeGot);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 items-center  justify-center mt-10 ">
      <div className="w-[450px]">
        <AddData />
        <List data={data} setData={setData} />
      </div>
    </div>
  );
}

export default App;
