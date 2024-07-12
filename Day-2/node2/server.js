const express = require("express");
const fs = require("fs");
const server = express();
const Port_Number = 3001;

server.use(express.json());


// Get all todos
server.get("/todos", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) return res.status(500).send(err);
    const todos = JSON.parse(data).todos;
    res.json(todos);
  });
});



// Add a new todo
server.post("/todos", (req, res) => {
  const newTodo = req.body;
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) return res.status(500).send(err);
    const db = JSON.parse(data);
    db.todos.push(newTodo);
    fs.writeFile("db.json", JSON.stringify(db), "utf8", (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(newTodo);
    });
  });
});



// Update the status of todos with even ID
server.put("/todos/updateEven", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) return res.status(500).send(err);
    const db = JSON.parse(data);
    db.todos = db.todos.map((todo) => {
      if (todo.id % 2 === 0 && !todo.status) {
        todo.status = true;
      }
      return todo;
    });
    fs.writeFile("db.json", JSON.stringify(db), "utf8", (err) => {
      if (err) return res.status(500).send(err);
      res.json(db.todos);
    });
  });
});



// Delete todos with status true
server.delete("/todos/deleteTrue", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) return res.status(500).send(err);
    let db = JSON.parse(data);
    db.todos = db.todos.filter((todo) => !todo.status);
    fs.writeFile("db.json", JSON.stringify(db), "utf8", (err) => {
      if (err) return res.status(500).send(err);
      res.json(db.todos);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
