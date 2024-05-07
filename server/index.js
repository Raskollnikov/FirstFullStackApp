import express from "express";
const app = express();
import cors from "cors";
import pool from "./db.js";
import { config } from "dotenv";
config();

const port = process.env.appPort;
//everytime u want to use Middleware u should write app.use();
app.use(cors());
app.use(express.json());

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "insert into todo (description) values($1) returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.get("/todos", async (req, res) => {
  const data = await pool.query("select * from todo");
  res.send(data.rows);
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    if (data.rows.length > 0) {
      res.send(data.rows);
    } else {
      res.send("No such data found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal server error");
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Check if description is provided
    if (!description) {
      return res.status(400).send("Description is required");
    }

    // Update the todo item in the database
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    // Check if any rows were affected by the update
    if (updateTodo.rowCount === 1) {
      res.send("Success");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the todo item from the database
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    // Check if any rows were affected by the deletion
    if (deleteTodo.rowCount === 1) {
      res.send("Todo deleted successfully");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal server error");
  }
});
app.listen(port, () => {
  console.log("server is Running on Port 5000!");
});
