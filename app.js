// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Instead of putting in the global scope
// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event, listen from form submit
  form.addEventListener("submit", addTask);
  // Event listener on to the task list itself for event delegation
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear whole task list event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks from LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    // If its empty, set the variable tasks to an empty array
    tasks = [];
  } else {
    // If there's something in there, only stores strings, so we need to parse it when it comes out from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    // Add class (from materialize)
    li.className = "collection-item";
    // Create the text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create a new link element
    const link = document.createElement("a");
    // Add class (secondary content class is materialize for float right)
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Now it's ready to be appended to the DOM
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value.trim() === "") {
    return;
  }
  // confirm("Add a task");

  // We create the new task element and append to the already present list

  // Create li element
  const li = document.createElement("li");
  // Add class (from materialize)
  li.className = "collection-item";
  // Create the text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create a new link element
  const link = document.createElement("a");
  // Add class (secondary content class is materialize for float right)
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Now it's ready to be appended to the DOM
  // Append li to ul
  taskList.appendChild(li);

  // Store in localStore
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input after append
  taskInput.value = "";

  console.log(li);

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  // Initialize
  let tasks;
  // Check if there's already any task in LS
  if (localStorage.getItem("tasks") === null) {
    // If its empty, set the variable tasks to an empty array
    tasks = [];
  } else {
    // If there's something in there, only stores strings, so we need to parse it when it comes out from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Push every task we get from LS into the empty array
  tasks.push(task);

  // Set it back to localStorage, as a string, that's why we wrap the variable into JSON.str
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  // to only target the delete-item we wrap everything in an if statement filtering for its class
  if (e.target.parentElement.classList.contains("delete-item")) {
    // To target the <li> element we call twice the parentelement to go up two levels from the clicked item
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS, we pass the whole element
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    // console.log(e.target);
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    // If its empty, set the variable tasks to an empty array
    tasks = [];
  } else {
    // If there's something in there, only stores strings, so we need to parse it when it comes out from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    // We match the tasks from LS with the ones that are trying to be deleted
    // We pass the index as the forEach callback (as in Vue)
    if (taskItem.textContent === task) {
      // Get the index and only delete one
      tasks.splice(index, 1);
    }
  });

  // Store new state of task list
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
  // Easy and quick way to empty a list
  // taskList.innerHTML = "";

  // Remove each one with a while loop (FASTER)
  // While there is still a first Child...then remove it
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  // Get whatever is being written in the filter field, so we pass the (e)
  const text = e.target.value.toLowerCase();
  // console.log(text);

  // Get all of the list items, with querySelectorAll we get a nodelist, so we can iterate with a for each
  document.querySelectorAll(".collection-item").forEach(
    // Iterator is task
    function(task) {
      const item = task.firstChild.textContent;
      // Set it to lowercase, as we did before, to match it to the previous added tasks
      if (item.toLowerCase().indexOf(text) != -1) {
        // Set the matched items to display: block
        task.style.display = "block";
      } else {
        // Set the items that don't match to display: none
        task.style.display = "none";
      }
    }
  );
}
