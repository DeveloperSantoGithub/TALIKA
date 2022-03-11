// Selectors:

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");
// Event Listeners:

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", todoFilter);

// Function:

function addTodo(event) {
  //Prevent from Submiting:
  event.preventDefault();

  //Create todo div:
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create li :
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = todoInput.value;
  todoDiv.appendChild(todoLi);

  //Add Todo to LocalStorage:

  saveLocalTodos(todoInput.value);

  //Create Check Mark Button:
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class ="fas fa-check" ></i>';
  checkButton.classList.add("check-btn");
  todoDiv.appendChild(checkButton);

  //Delete Button:
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class ="fas fa-trash" ></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  // Append to List:
  todoList.appendChild(todoDiv);

  //Clear todo Input value:
  todoInput.value = "";
}

// Delete and Check mark function:

function deleteCheck(e) {
  const item = e.target;

  //Delete todo:
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    //Animation:
    todo.classList.add("fall");
    removeLocalTodos(todo); //***** important ** */
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    // todo.remove();
  }

  //Check Mark:
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Todo Filter:

function todoFilter(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

//------------------------------Data Save to Local Storage:

function saveLocalTodos(todo) {
  //Check ----> koro Data gulo ki already exists kore kina.

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//------------------------------Get Data from LocalStorage:

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div:
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li :
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerText = todo;
    todoDiv.appendChild(todoLi);

    //Create Check Mark Button:
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class ="fas fa-check" ></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);

    //Delete Button:
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class ="fas fa-trash" ></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // Append to List:
    todoList.appendChild(todoDiv);
  });
}

//---------------------------Remove Data from LocalStorage:

function removeLocalTodos(todo) {
  //Check ----> koro Data gulo ki already exists kore kina.

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
