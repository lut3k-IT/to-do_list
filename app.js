'use strict';

/* -------------------------------------------------------------------------- */
/*                              global variables                              */
/* -------------------------------------------------------------------------- */

// DOM
let todoAddButton;
let todoInput;
let todoContainer;
let todoList;

// storage
let tasks = [];

/* -------------------------------------------------------------------------- */
/*                                   classes                                  */
/* -------------------------------------------------------------------------- */

class TodoTask {
  constructor(content, isChecked = false) {
    this.id = (Date.now() + '').slice(-10);
    this.content = content;
    this.isChecked = isChecked;
  }
}

/* -------------------------------------------------------------------------- */
/*                               initialization                               */
/* -------------------------------------------------------------------------- */

const init = () => {
  prepareDOMElements();
  prepareDOMEvents();
  handleLoadTasks();
};

const prepareDOMElements = () => {
  todoAddButton = document.querySelector('.todo__insert-btn');
  todoInput = document.querySelector('.todo__insert-input');
  todoList = document.querySelector('.todo__list');
  todoContainer = document.querySelector('.todo');
};

const prepareDOMEvents = () => {
  todoContainer.addEventListener('click', handleClick);
  todoInput.addEventListener('keyup', isEnter);
};

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a todo object
 * @constructor
 */
const handleCreateTask = () => {
  if (todoInput.value !== '') {
    const newTask = new TodoTask(todoInput.value);

    tasks.push(newTask);
    renderTask(newTask);
    addTasksToLocalStorage();

    clearInput();
  } else {
    todoInput.placeholder = 'Complete this field!';
  }
};

/**
 * Loads all tasks and renders if there are any
 */
const handleLoadTasks = () => {
  if (!localStorage.getItem('tasks')) return;
  tasks = JSON.parse(localStorage.getItem('tasks'));

  if (!tasks) return;
  tasks.forEach((task) => renderTask(task));
};

/**
 * Renders the task to DOM
 *
 * @param {Object} todo - TodoTask object
 */
const renderTask = (todo) => {
  const html = `
  <div data-id="${todo.id}" class="todo__list-item ${
    todo.isChecked && 'item-checked'
  }">
    <div class="todo__list-item-btn">
      <input class="todo__list-item-btn-check" type="checkbox" ${
        todo.isChecked && checked
      }>
    </div>
    <div class="todo__list-item-content">${todo.content}</div>
    <button class="todo__list-item-btn  todo__list-item-btn-del">
      <img src="assets/trash.svg" alt="trash">
    </button>
  </div>
  `;
  todoList.insertAdjacentHTML('beforeend', html);
};

/**
 * Saves tasks to localstorage
 */
const addTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

/**
 * Clears the input field
 */
const clearInput = () => {
  todoInput.placeholder = '';
  todoInput.value = '';
};

/**
 * Removes the task from the row
 */
const handleDeleteTask = (e) => {
  const task = e.target.closest('.todo__list-item');
  const taskID = task.dataset.id;
  tasks = tasks.filter((task) => task.id !== taskID);

  localStorage.removeItem('tasks');
  addTasksToLocalStorage();

  task.remove();
};

/**
 * Removes all tasks from DOM and localStorage
 */
const handleDeleteAllTasks = () => {
  localStorage.clear();

  document.querySelectorAll('.todo__list-item').forEach((task) => {
    task.remove();
  });
};

/**
 * Adds a task if ENTER was pressed
 */
const isEnter = (e) => {
  if (e.keyCode === 13) {
    handleCreateTask();
  }
};

/**
 * Handles cilcks. Performs some action depending on the target.
 */
const handleClick = (e) => {
  // checkbox
  if (e.target.classList.contains('todo__list-item-btn-check')) {
    const taskElement = e.target.closest('.todo__list-item');

    taskElement.classList.toggle('item-checked');

    // changing isChecked
    tasks.forEach((task) => {
      if (taskElement.dataset.id === task.id)
        task.isChecked ? (task.isChecked = false) : (task.isChecked = true);
    });

    // updating localStorage
    addTasksToLocalStorage();
  }
  // deletes one
  else if (e.target.closest('.todo__list-item-btn-del')) {
    handleDeleteTask(e);
  }
  // deletes all
  else if (e.target.closest('.todo__header-btn-del')) {
    handleDeleteAllTasks(e);
  }
  // input
  else if (e.target.closest('.todo__insert-btn')) {
    handleCreateTask();
  }
};

/* -------------------------------- app init -------------------------------- */
document.addEventListener('DOMContentLoaded', init);
