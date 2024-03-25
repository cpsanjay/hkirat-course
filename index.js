const express = require("express");
const zod = require("zod");
const app = express();
const fs = require("fs");

const port = 3000;
const schema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  country: zod.literal("IN").or(zod.literal("US")),
});

app.use(express.json());

app.post("/health-check", (req, res) => {
  const kidneys = req.body;

  //   const kidneyLength = kidneys.length;

  const response = schema.safeParse(kidneys);

  res.send({ response });

  //   res.send(`You have ${kidneyLength} kidneys`);
});
// app.get("/todos", (req, res) => {
//   fs.readFile("todo.json", "utf8", (err, data) => {
//     if (err) {
//       res.status(500).send("Error reading todo list");
//       return;
//     }
//     res.send(JSON.parse(data));
//   });
// });

// app.post("/addTodo", (req, res) => {
//   fs.readFile("todo.json", "utf8", (err, data) => {
//     const todoList = JSON.parse(data);
//     const newTodo = req.body;

//     todoList.push({ id: todoList.length + 1, ...newTodo });
//     const jsonData = JSON.stringify(todoList, null, 2);
//     fs.writeFile("todo.json", jsonData, () => {
//       res.send(todoList);
//       return;
//     });
//   });
// });

// app.delete("/deleteAll", (req, res) => {
//   fs.writeFile("todo.json", JSON.stringify([]), () => {
//     res.send([]);
//   });
// });

// app.put("/remove", (req, res) => {
//   const id = req.query.id;
//   fs.readFile("todo.json", "utf-8", (err, data) => {
//     const todoCopy = JSON.parse(data);
//     const newTodo = todoCopy.filter((item) => item.id !== parseInt(id));

//     const jsonData = JSON.stringify(newTodo, null, 2);
//     fs.writeFile("todo.json", jsonData, () => res.send(newTodo));
//   });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
