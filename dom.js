
// ==========================================
// TASK 9.2: TRAVERSING THE DOM
// ==========================================

console.log("TASK 9.2: DOM Traversing");

const navElement = document.querySelector("nav");

// Parent element
console.log("Nav parent:", navElement.parentElement);

// Children
console.log("Nav children:", navElement.children);
console.log("First child:", navElement.firstElementChild);
console.log("Last child:", navElement.lastElementChild);

// Siblings
const articleElement = document.querySelector("article");

console.log("Next sibling:", articleElement.nextElementSibling);
console.log("Previous sibling:", articleElement.previousElementSibling);

// Descendants
const linksInsideNav = navElement.querySelectorAll("a");
console.log("Nav links:", linksInsideNav);

// Practice tasks
const selectedHeader = document.querySelector("header");
const navInsideHeader = selectedHeader.querySelector("nav");
console.log("Nav inside header:", navInsideHeader);

const selectedLink = document.querySelector(".nav-link");
console.log("Link parent:", selectedLink.parentElement);

const selectedArticle = document.querySelector("article");
console.log("Article next sibling:", selectedArticle.nextElementSibling);

const selectedList = document.querySelector(".nav-list");
console.log("List items:", selectedList.children);

const selectedFooter = document.querySelector("footer");
console.log("Footer parent:", selectedFooter.parentElement);
console.log("Footer to body:", selectedFooter.parentElement.parentElement);


// ==========================================
// TASK 9.3: MODIFYING CONTENT
// ==========================================

console.log("TASK 9.3: Modifying Content");

// Exercise 1: Text Content
const mainHeading = document.querySelector("h1");

console.log("Text content:", mainHeading.textContent);
console.log("Inner text:", mainHeading.innerText);

// Exercise 2: HTML Content
const articleForContent = document.querySelector("article");

console.log("Article HTML:", articleForContent.innerHTML);

// Create a separate example so the original article stays unchanged
const contentExample = document.createElement("div");

contentExample.innerHTML = `
    <h3>Updated Article</h3>
    <p>This is new content.</p>
`;

document.body.appendChild(contentExample);

// Using textContent for user input is safer
const userInput = `<img src="x" onerror="alert('hacked!')">`;

const safeExample = document.createElement("p");
safeExample.textContent = userInput;
document.body.appendChild(safeExample);

// Exercise 3: Attributes
const selectedNavLink = document.querySelector(".nav-link");

console.log("Link href:", selectedNavLink.getAttribute("href"));
console.log("Full link:", selectedNavLink.href);

selectedNavLink.setAttribute("href", "https://developer.mozilla.org");

console.log("Has target:", selectedNavLink.hasAttribute("target"));

selectedNavLink.setAttribute("target", "_blank");
selectedNavLink.setAttribute("rel", "noopener noreferrer");
selectedNavLink.removeAttribute("target");

// Data attributes
const dataExample = document.createElement("div");

dataExample.dataset.id = "123";
dataExample.dataset.category = "tech";

console.log("Data ID:", dataExample.dataset.id);
console.log("Data category:", dataExample.dataset.category);

dataExample.dataset.newAttr = "value";

document.body.appendChild(dataExample);

// Exercise 4: Styles
const mainContainer = document.querySelector(".container");

mainContainer.style.backgroundColor = "#f0f0f0";
mainContainer.style.padding = "30px";
mainContainer.style.borderRadius = "8px";

Object.assign(contentExample.style, {
    backgroundColor: "#333",
    color: "white",
    padding: "20px"
});


// ==========================================
// TASK 9.4: ADDING AND REMOVING ELEMENTS
// ==========================================

console.log("TASK 9.4: Adding and Removing Elements");

// Exercise 1: Creating Elements
const newParagraph = document.createElement("p");

newParagraph.textContent = "This is a new paragraph!";
newParagraph.className = "content highlight";

const articleForElements = document.querySelector("article");

articleForElements.appendChild(newParagraph);

// Insert another paragraph before the first paragraph
const firstArticleParagraph = articleForElements.querySelector("p");

const insertedParagraph = document.createElement("p");
insertedParagraph.textContent = "This paragraph was inserted before the first one.";

articleForElements.insertBefore(insertedParagraph, firstArticleParagraph);

// Modern insertion methods
const extraParagraph = document.createElement("p");
extraParagraph.textContent = "Added using prepend.";

articleForElements.prepend(extraParagraph);

const finalParagraph = document.createElement("p");
finalParagraph.textContent = "Added using append.";

articleForElements.append(finalParagraph);

// Exercise 2: Removing Elements
const temporaryElement = document.createElement("p");

temporaryElement.textContent = "This element will be removed.";
document.body.appendChild(temporaryElement);

temporaryElement.remove();

// Remove a child from a parent
const temporaryList = document.createElement("ul");

temporaryList.innerHTML = "<li>First</li><li>Second</li>";
document.body.appendChild(temporaryList);

const lastTemporaryItem = temporaryList.querySelector("li:last-child");

temporaryList.removeChild(lastTemporaryItem);

// Clear children safely
while (temporaryList.firstChild) {
    temporaryList.removeChild(temporaryList.firstChild);
}

// Exercise 3: Cloning Elements
const originalNavItem = document.querySelector(".nav-link").parentElement;

const clonedNavItem = originalNavItem.cloneNode(true);

clonedNavItem.querySelector("a").textContent = "New Link";
clonedNavItem.querySelector("a").href = "#";

document.querySelector(".nav-list").appendChild(clonedNavItem);

// Build: Add navigation items dynamically
function addNavItem(text, href) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = text;
    link.href = href;
    link.className = "nav-link";

    listItem.appendChild(link);

    document.querySelector(".nav-list").appendChild(listItem);
}

addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");


// ==========================================
// TASK 10.1: EVENT LISTENERS
// ==========================================

console.log("TASK 10.1: Event Listeners");

// Create a click counter
const counterSection = document.createElement("section");

counterSection.innerHTML = `
    <h2>Click Counter</h2>
    <p id="counter-value">Count: 0</p>
    <button id="increase">+</button>
    <button id="decrease">-</button>
    <button id="reset">Reset</button>
`;

document.body.appendChild(counterSection);

let count = 0;

const counterDisplay = document.getElementById("counter-value");

function updateCounter() {
    counterDisplay.textContent = "Count: " + count;
}

document.getElementById("increase").addEventListener("click", function() {
    count++;
    updateCounter();
});

document.getElementById("decrease").addEventListener("click", function() {
    if (count > 0) {
        count--;
    }

    updateCounter();
});

document.getElementById("reset").addEventListener("click", function() {
    count = 0;
    updateCounter();
});

// Named function and removing an event listener
function handleClick() {
    console.log("Handled!");
}

const counterButton = document.getElementById("increase");

counterButton.addEventListener("click", handleClick);
counterButton.removeEventListener("click", handleClick);

// Other event types
const nameField = document.getElementById("name");

nameField.addEventListener("focus", function() {
    console.log("Name field focused");
});

nameField.addEventListener("blur", function() {
    console.log("Name field lost focus");
});

nameField.addEventListener("keydown", function() {
    console.log("A key was pressed in the name field");
});

nameField.addEventListener("input", function() {
    console.log("Name:", nameField.value);
});

window.addEventListener("resize", function() {
    console.log("Window resized");
});

window.addEventListener("scroll", function() {
    console.log("Page scrolled");
});


// ==========================================
// TASK 10.2: THE EVENT OBJECT
// ==========================================

console.log("TASK 10.2: Event Object");

const eventSection = document.createElement("section");

eventSection.innerHTML = `
    <h2>Event Object Practice</h2>
    <a href="https://example.com" id="event-link">Test Event Link</a>
`;

document.body.appendChild(eventSection);

const eventLink = document.getElementById("event-link");

eventLink.addEventListener("click", function(event) {
    console.log("Target:", event.target);
    console.log("Current Target:", event.currentTarget);
    console.log("Event type:", event.type);
    console.log("Mouse position:", event.clientX, event.clientY);

    event.preventDefault();
    event.stopPropagation();
});

// Keyboard events
document.addEventListener("keydown", function(event) {
    console.log("Key:", event.key);
    console.log("Code:", event.code);
    console.log("Shift:", event.shiftKey);
    console.log("Ctrl:", event.ctrlKey);
    console.log("Alt:", event.altKey);
});

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {

    // Ctrl + S
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        alert("Saved!");
    }

    // Escape clears form inputs
    if (event.key === "Escape") {
        document.getElementById("contact-form").reset();
    }

    // Ctrl + Enter submits the contact form
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        document.getElementById("contact-form").requestSubmit();
    }
});


// ==========================================
// TASK 10.3: EVENT BUBBLING AND DELEGATION
// ==========================================

console.log("TASK 10.3: Event Bubbling");

// Create nested elements
const grandparent = document.createElement("div");
grandparent.id = "grandparent";
grandparent.textContent = "Grandparent";

const parent = document.createElement("div");
parent.id = "parent";
parent.textContent = "Parent";

const child = document.createElement("div");
child.id = "child";
child.textContent = "Child";

grandparent.appendChild(parent);
parent.appendChild(child);

document.body.appendChild(grandparent);

// Add click listeners
grandparent.addEventListener("click", function() {
    console.log("Grandparent clicked");
});

parent.addEventListener("click", function() {
    console.log("Parent clicked");
});

child.addEventListener("click", function() {
    console.log("Child clicked");
});

// Event delegation: create a task list
const taskSection = document.createElement("section");

taskSection.innerHTML = `
    <h2>Delegated Task List</h2>

    <form id="practice-task-form">
        <input type="text" id="practice-task-input" placeholder="Enter a task">
        <button type="submit">Add Task</button>
    </form>

    <ul id="practice-task-list"></ul>
`;

document.body.appendChild(taskSection);

const practiceTaskForm = document.getElementById("practice-task-form");
const practiceTaskInput = document.getElementById("practice-task-input");
const practiceTaskList = document.getElementById("practice-task-list");

// Add tasks
practiceTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = practiceTaskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    span.textContent = taskText;
    span.className = "item";

    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.className = "delete-task";

    li.appendChild(span);
    li.appendChild(deleteButton);

    practiceTaskList.appendChild(li);

    practiceTaskInput.value = "";
});

// ONE click listener handles all task items
practiceTaskList.addEventListener("click", function(event) {
    const listItem = event.target.closest("li");

    if (!listItem || !practiceTaskList.contains(listItem)) {
        return;
    }

    // Delete a task
    if (event.target.matches(".delete-task")) {
        listItem.remove();
        return;
    }

    // Mark a task as completed
    if (event.target.matches(".item")) {
        listItem.classList.toggle("completed");
        listItem.style.textDecoration =
            listItem.classList.contains("completed")
                ? "line-through"
                : "none";
    }
});


// ==========================================
// TASK 10.4: FORM HANDLING AND VALIDATION
// ==========================================

console.log("TASK 10.4: Form Validation");

const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");

// Display an error message
function showError(input, message) {
    input.classList.add("error");

    let errorMessage = input.nextElementSibling;

    if (!errorMessage || !errorMessage.classList.contains("error-message")) {
        errorMessage = document.createElement("small");
        errorMessage.className = "error-message";
        input.insertAdjacentElement("afterend", errorMessage);
    }

    errorMessage.textContent = message;
    errorMessage.style.color = "red";
}

// Remove an error message
function clearError(input) {
    input.classList.remove("error");

    const errorMessage = input.nextElementSibling;

    if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.remove();
    }
}

// Check whether the name is valid
function validateName() {
    if (contactName.value.trim().length < 2) {
        showError(contactName, "Name must be at least 2 characters");
        return false;
    }

    clearError(contactName);
    return true;
}

// Check whether the email is valid
function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactEmail.value.trim())) {
        showError(contactEmail, "Please enter a valid email");
        return false;
    }

    clearError(contactEmail);
    return true;
}

// Real-time validation
contactName.addEventListener("input", validateName);
contactEmail.addEventListener("input", validateEmail);

// Check all fields
function isValid(data) {
    return data.name.trim().length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
}

// Display success message
function showSuccess(message) {
    let successMessage = document.getElementById("form-success");

    if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.id = "form-success";
        successMessage.style.color = "green";
        contactForm.appendChild(successMessage);
    }

    successMessage.textContent = message;
}

// Handle form submission
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log("Form data:", data);

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();

    if (nameIsValid && emailIsValid && isValid(data)) {
        showSuccess("Form submitted successfully!");

        contactForm.reset();

        clearError(contactName);
        clearError(contactEmail);
    }
});

// Initial display
console.log("All Lesson 9 and Lesson 10 practice exercises loaded.");

