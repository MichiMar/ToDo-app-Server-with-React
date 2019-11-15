const express = require("express");
const router = express.Router();

const Todo = require("../models/todoModel");

//GET 2, POST 1, PATH 3, DELETE

//GET
router.route("/todos").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log("Get Todos Err " + err);
    } else {
      res.status(200).json(todos);
    }
  });
});

//POST
router.route("/todo").post((request, response) => {
  const todo = new Todo(request.body);

  todo
    .save()
    .then(todo => {
      response.status(200).json(todo);
    })
    .catch(err => {
      response.status(400).send("Unable to add item: " + err);
    });
});

//PATCH
router.route("/todo/:id").patch((req, res) => {
  const id = req.params.id;

  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(404).send("item notfound: " + err);
    } else {
      todo.done = req.body.done;

      todo
        .save()
        .then(todo => {
          res.json("Todo Updated " + todo);
        })
        .catch(err => {
          res.status(400).send("Unable to update: " + err);
        });
    }
  });
});
//DELETE
router.route("/todo/:id").delete((req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) {
      res.json("Could not delete " + err);
    } else {
      res.json("Get rid of that thing!");
    }
  });
});

module.exports = router;
