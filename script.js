// LOGIN
function login() {

  localStorage.setItem(
    "currentUser",
    document.getElementById("loginUser").value
  );

  window.location = "home.html";
}

// REGISTER
function register() {

  alert("Registered!");

  window.location = "login.html";
}

// HOME
function loadHome() {

  document.getElementById("welcome").innerText =
    "Hello " + localStorage.getItem("currentUser");

  fetch("https://api.quotable.io/random")

    .then(r => r.json())

    .then(d => {

      document.getElementById("quote").innerText =
        d.content;

    })

    .catch(() => {

      document.getElementById("quote").innerText =
        "Stay focused 💪";

    });

  loadHomeTasks();
}

// SHOW TASKS ON HOME
function loadHomeTasks() {

  let container =
    document.getElementById("homeTasks");

  if (!container) return;

  let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  container.innerHTML = "";

  tasks.forEach((t, index) => {

    let div =
      document.createElement("div");

    div.className = "task-card";

    div.innerHTML = `
      <h4>${index + 1}. ${t.name}</h4>
      <p>${t.date}</p>
    `;

    container.appendChild(div);
  });
}

// ADD TASK
function addTask() {

  let name =
    document.getElementById("taskName").value.trim();

  let date =
    document.getElementById("dueDate").value;

  // validation
  if (name === "" || date === "") {

    showToast("Please fill all fields");

    return;
  }

  let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({
    name: name,
    date: date,
    important: false
  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  // clear inputs
  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

  showToast("Task Added");

  loadTasks();
}

// LOAD TASKS
function loadTasks() {

  let list =
    document.getElementById("taskList");

  if (!list) return;

  list.innerHTML = "";

  let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((t, i) => {

    // CARD
    let div =
      document.createElement("div");

    div.className = "task-card";

    // IMPORTANT STYLE
    if (t.important) {
      div.style.border = "3px solid gold";
    }

    // TITLE
    let title =
      document.createElement("h3");

    title.innerText =
      `${i + 1}. ${t.name}`;

    // DATE
    let date =
      document.createElement("p");

    date.innerText = t.date;

    // IMPORTANT BUTTON
    let starBtn =
      document.createElement("button");

    starBtn.innerText = "⭐";

    starBtn.onclick = function () {

      let tasks =
        JSON.parse(localStorage.getItem("tasks"));

      tasks[i].important =
        !tasks[i].important;

      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
      );

      showToast("Task Updated");

      loadTasks();
    };

    // DELETE BUTTON
    let deleteBtn =
      document.createElement("button");

    deleteBtn.innerText = "❌";

    deleteBtn.onclick = function () {

      let tasks =
        JSON.parse(localStorage.getItem("tasks"));

      tasks.splice(i, 1);

      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
      );

      showToast("Task Deleted");

      loadTasks();
    };

    // APPEND
    div.appendChild(title);

    div.appendChild(date);

    div.appendChild(starBtn);

    div.appendChild(deleteBtn);

    // ADD TO PAGE
    list.appendChild(div);
  });
}

// TIMER
let timer = null;

let time = 0;

function startTimer() {

  if (timer) return;

  time =
    document.getElementById("minutes").value * 60;

  timer = setInterval(() => {

    if (time <= 0) {

      clearInterval(timer);

      timer = null;

      showToast("Time Up!");

      return;
    }

    time--;

    let min =
      Math.floor(time / 60);

    let sec =
      time % 60;

    document.getElementById("countdown").innerText =
      `${min}:${sec < 10 ? "0" : ""}${sec}`;

  }, 1000);
}

// PAUSE TIMER
function pauseTimer() {

  clearInterval(timer);

  timer = null;
}

// RESET TIMER
function resetTimer() {

  clearInterval(timer);

  timer = null;

  document.getElementById("countdown").innerText =
    "00:00";
}

// TOAST
function showToast(msg) {

  let t =
    document.getElementById("toast");

  if (!t) return;

  t.innerText = msg;

  t.style.display = "block";

  setTimeout(() => {

    t.style.display = "none";

  }, 2000);
}