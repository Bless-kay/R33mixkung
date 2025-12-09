let tasks = [];

const elements = {
  form: document.getElementById('task-form'),
  nameInput: document.getElementById('task-name'),
  dateInput: document.getElementById('task-date'),
  categoryInput: document.getElementById('task-category'),
  nameError: document.getElementById('name-error'),
  addBtn: document.getElementById('add-btn'),

  search: document.getElementById('search'),
  filterCategory: document.getElementById('filter-category'),
  sortBy: document.getElementById('sort-by'),

  list: document.getElementById('task-list'),
  empty: document.getElementById('empty-state'),

  counterTotal: document.getElementById('counter-total'),
  counterCompleted: document.getElementById('counter-completed'),
};

// 🔹 Prevent selecting past dates
const today = new Date().toISOString().split("T")[0];
elements.dateInput.setAttribute("min", today);

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function fmtDate(iso) {
  if (!iso) return 'No due date';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem('tasks');
  if (data) tasks = JSON.parse(data);
}

function render() {
  const query = elements.search.value.trim().toLowerCase();
  const filterCat = elements.filterCategory.value;
  const sort = elements.sortBy.value;

  let view = tasks.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(query);
    const matchCategory = filterCat === 'All' || t.category === filterCat;
    return matchSearch && matchCategory;
  });

  if (sort === 'name') {
    view.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'date') {
    view.sort((a, b) => {
      const da = a.dueDate ? new Date(a.dueDate) : Infinity;
      const db = b.dueDate ? new Date(b.dueDate) : Infinity;
      return da - db;
    });
  } else {
    view.sort((a, b) => b.createdAt - a.createdAt);
  }

  elements.list.innerHTML = '';

  if (view.length === 0) {
    elements.empty.style.display = 'block';
  } else {
    elements.empty.style.display = 'none';
    view.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.dataset.id = task.id;

      const left = document.createElement('div');
      left.className = 'task-left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleComplete(task.id));

      const name = document.createElement('div');
      name.className = 'task-name';
      name.textContent = task.name;

      left.appendChild(checkbox);
      left.appendChild(name);

      const middle = document.createElement('div');
      const meta = document.createElement('div');
      meta.className = 'task-meta';
      meta.textContent = `${task.category} • ${fmtDate(task.dueDate)}`;
      middle.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'task-actions';

      const completeBtn = document.createElement('button');
      completeBtn.className = 'btn btn-outline';
      completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
      completeBtn.addEventListener('click', () => toggleComplete(task.id));

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(left);
      li.appendChild(middle);
      li.appendChild(actions);

      elements.list.appendChild(li);
    });
  }

  elements.counterTotal.textContent = `Total: ${tasks.length}`;
  elements.counterCompleted.textContent = `Completed: ${tasks.filter(t => t.completed).length}`;
}

function addTask(e) {
  e.preventDefault();

  const name = elements.nameInput.value.trim();
  if (!name) {
    elements.nameError.textContent = 'Task name is required.';
    return;
  }
  elements.nameError.textContent = '';

  // 🔹 Prevent past dates
  const selectedDate = elements.dateInput.value;
  if (selectedDate !== "" && selectedDate < today) {
    alert("You cannot select a past date.");
    return;
  }

  const newTask = {
    id: uid(),
    name,
    dueDate: elements.dateInput.value,
    category: elements.categoryInput.value,
    completed: false,
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  saveTasks();
  elements.form.reset();
  render();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

elements.form.addEventListener('submit', addTask);
elements.search.addEventListener('input', render);
elements.filterCategory.addEventListener('change', render);
elements.sortBy.addEventListener('change', render);

loadTasks();
render();
