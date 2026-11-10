
// Get the HTML elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// Store tasks
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Save tasks in the browser
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "todo-checkbox";
    checkbox.setAttribute("aria-label", "Mark task as completed");

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;
    span.title = "Double-click to edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

// Display tasks
function renderTodos() {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter(function(todo) {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    filteredTodos.forEach(function(todo) {
        const element = createTodoElement(todo);
        todoList.appendChild(element);
    });

    updateStats();
}

// Add a new task
function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();
    renderTodos();
}

// Mark a task as completed
function toggleTodo(id) {
    todos = todos.map(function(todo) {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }

        return todo;
    });

    saveTodos();
    renderTodos();
}

// Delete a task
function deleteTodo(id) {
    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });

    saveTodos();
    renderTodos();
}

// Update the number of remaining tasks
function updateStats() {
    const remaining = todos.filter(function(todo) {
        return !todo.completed;
    }).length;

    itemsLeft.textContent = remaining +
        (remaining === 1 ? " item left" : " items left");
}

// Change the task filter
function filterTodos(filter) {
    currentFilter = filter;

    filters.forEach(function(button) {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderTodos();
}

// Add task when the form is submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    addTodo(text);
    input.value = "";
    input.focus();
});

// Handle task clicks using event delegation
todoList.addEventListener("click", function(event) {
    const item = event.target.closest(".todo-item");

    if (!item) {
        return;
    }

    const id = Number(item.dataset.id);

    if (event.target.matches(".delete-btn")) {
        deleteTodo(id);
    }
});

// Handle completion checkboxes
todoList.addEventListener("change", function(event) {
    if (event.target.matches(".todo-checkbox")) {
        const item = event.target.closest(".todo-item");

        if (item) {
            toggleTodo(Number(item.dataset.id));
        }
    }
});

// Double-click a task to edit it
todoList.addEventListener("dblclick", function(event) {
    if (!event.target.matches(".todo-text")) {
        return;
    }

    const item = event.target.closest(".todo-item");
    const id = Number(item.dataset.id);
    const todo = todos.find(function(task) {
        return task.id === id;
    });

    if (!todo) {
        return;
    }

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    editInput.className = "edit-input";

    const originalText = todo.text;

    event.target.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    function finishEditing(save) {
        if (save && editInput.value.trim() !== "") {
            todo.text = editInput.value.trim();
            saveTodos();
        }

        renderTodos();
    }

    editInput.addEventListener("keydown", function(keyEvent) {
        if (keyEvent.key === "Enter") {
            finishEditing(true);
        }

        if (keyEvent.key === "Escape") {
            todo.text = originalText;
            finishEditing(false);
        }
    });

    editInput.addEventListener("blur", function() {
        if (editInput.isConnected) {
            finishEditing(true);
        }
    });
});

// Handle filter buttons
filters.forEach(function(button) {
    button.addEventListener("click", function() {
        filterTodos(button.dataset.filter);
    });
});

// Remove all completed tasks
clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(function(todo) {
        return !todo.completed;
    });

    saveTodos();
    renderTodos();
});

// Display saved tasks when the page opens
renderTodos();
