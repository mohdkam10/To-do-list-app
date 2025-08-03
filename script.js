document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  document.getElementById("taskList").appendChild(li);
  saveTask(taskText);
  taskInput.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.style.background = "none";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    deleteTask(text);
  };

  li.appendChild(deleteBtn);
  return li;
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(task => {
    const li = createTaskElement(task);
    document.getElementById("taskList").appendChild(li);
  });
}