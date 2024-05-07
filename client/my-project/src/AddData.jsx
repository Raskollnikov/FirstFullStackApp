import { useState } from "react";

function AddData() {
  const [data, setData] = useState("");

  const submitTheButton = async () => {
    try {
      // Send a POST request to the server with the data
      if (data.length > 0) {
        const response = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: data }), // Assuming 'description' is the key in your server for the data
        });

        window.location = "/";
        if (response.ok) {
          console.log("Data sent successfully");
          // Optionally, you can reset the input field after successful submission
          setData("");
        } else {
          // Handle any errors returned by the server
          console.error("Failed to send data:", response.statusText);
        }
      }

      // Check if the request was successful (status code 2xx)
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error sending data:", error);
    }
  };
  return (
    <div className="flex ">
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
        placeholder="Input Data..."
        className="max-w-[800px] w-[400px] border outline-none p-3  rounded-tl-md rounded-bl-md"
      />
      <button
        onClick={submitTheButton}
        className="bg-green-500 text-white p-3  rounded-tr-md rounded-br-md"
      >
        Submit
      </button>
    </div>
  );
}

export default AddData;
