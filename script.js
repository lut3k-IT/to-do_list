'use strict';
//         _       _           _
//    __ _| | ___ | |__   __ _| |    __   ____ _ _ __
//  / _` | |/ _ \| '_ \ / _` | |____\ \ / / _` | '__|
// | (_| | | (_) | |_) | (_| | |_____\ V | (_| | |
// \__, |_|\___/|_.__/ \__,_|_|      \_/ \__,_|_|
// |___/

// DOM
let $todoBtnAdd; // adding task button
let $todoInput; // <input> tag
let $todoCont; // whole app container
let $todoList; // tasks container

// storage
let $tasks = []; // all tasks array

//        _
//    ___| | __ _ ___ ___  ___ ___
//  / __| |/ _` / __/ __|/ _ / __|
// | (__| | (_| \__ \__ |  __\__ \
// \___|_|\__,_|___|___/\___|___/

class Todo {
    constructor(content, isChecked = false) {
        this.id = (Date.now() + '').slice(-10);
        this.content = content;
        this.isChecked = isChecked;
    }
};

//      _       _ _   _       _ _          _   _
//    (_)_ __ (_| |_(_) __ _| (_)______ _| |_(_) ___  _ __
//   | | '_ \| | __| |/ _` | | |_  / _` | __| |/ _ \| '_ \
//  | | | | | | |_| | (_| | | |/ | (_| | |_| | (_) | | | |
// |_|_| |_|_|\__|_|\__,_|_|_/___\__,_|\__|_|\___/|_| |_|

const init = () => {
    prepareDOMElements();
    prepareDOMEvents();
    loadTasks();
}

const prepareDOMElements = () => {
    $todoBtnAdd = document.querySelector('.todo__insert-btn');
    $todoInput = document.querySelector('.todo__insert-input');
    $todoList = document.querySelector('.todo__list');
    $todoCont = document.querySelector('.todo');
}

const prepareDOMEvents = () => {
    // buttons listener
    $todoCont.addEventListener('click', checkClick);
    // ENTER key listener
    $todoInput.addEventListener('keyup', isEnter);
}

//      __                  _   _
//    / _|_   _ _ __   ___| |_(_) ___  _ __  ___
//   | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//  |  _| |_| | | | | (__| |_| | (_) | | | \__ \
// |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

// SPIS
// ===
// createTask - tworzy obiekt
// addTaskDOM - wrzuca wizualnie taska (DOM)
// addTasksLS - zapisuje wszystkie taski w localStorage
// clearInput - czyści inputa
// deleteTask - usuwa taska
// deleteAllTasks - usuwa wszystkie taski
// isEnter - sprawdza czy naciśnięto ENTER na polu input


// it creates a todo object
const createTask = () => {
    if ($todoInput.value !== '') {
        const inputVal = $todoInput.value; // what user wrote
        const todo = new Todo(inputVal); // todo object

        // adding the task to array, DOM and localStorage
        $tasks.push(todo);
        addTaskDOM(todo);
        addTasksLS();

        // clearing the placeholder & input value
        clearInput();
    }
    else {
        $todoInput.placeholder = 'Uzupełnij pole!';
    }
}

// it loads all tasks from localStorage and delegate rendering taks in DOM
const loadTasks = () => {
    if (!localStorage.getItem('tasks')) return;
    $tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!$tasks) return;
    $tasks.forEach(task => addTaskDOM(task));
}

// it adds todo into DOM
const addTaskDOM = todo => {
    let html;

    if (todo.isChecked === false) {
        html = `
        <div data-id="${todo.id}" class="todo__list-item">
            <div class="todo__list-item-btn">
                <input class="todo__list-item-btn-check" type="checkbox">
            </div>
            <div class="todo__list-item-content">${todo.content}</div>
            <button class="todo__list-item-btn  todo__list-item-btn-del">
                <img src="img/trash.svg" alt="trash">
            </button>
        </div>
        `;
    }
    else {
        html = `
        <div data-id="${todo.id}" class="todo__list-item item-checked">
            <div class="todo__list-item-btn">
                <input class="todo__list-item-btn-check" type="checkbox" checked>
            </div>
            <div class="todo__list-item-content">${todo.content}</div>
            <button class="todo__list-item-btn  todo__list-item-btn-del">
                <img src="img/trash.svg" alt="trash">
            </button>
        </div>
        `;
    }

    $todoList.insertAdjacentHTML('beforeend', html);
}

// it saves the tasks in localStorage
const addTasksLS = () => {
    localStorage.setItem('tasks', JSON.stringify($tasks));
}

// it clears the input
const clearInput = () => {
    $todoInput.placeholder = '';
    $todoInput.value = '';
}

// it deletes only selected task from DOM and localStorage
const deleteTask = e => {
    const task = e.target.closest('.todo__list-item');
    const taskID = task.dataset.id;
    $tasks = $tasks.filter(task => task.id !== taskID);

    // deleting & adding tasks - localStorage
    localStorage.removeItem('tasks');
    addTasksLS();

    // deleting task - DOM
    task.remove();
}

// it deletes all tasks from DOM and localStorage
const deleteAllTasks = () => {
    localStorage.clear();

    const allTasks = document.querySelectorAll('.todo__list-item');
    allTasks.forEach(task => {
        task.remove();
    });
}

// it adds a task if ENTER is pressed
const isEnter = e => {
    if (e.keyCode === 13) {
        createTask();
    }
}

// if button clicked
const checkClick = e => {
    // checkbox
    if (e.target.classList.contains('todo__list-item-btn-check')) {
        const taskDOM = e.target.closest('.todo__list-item');
        taskDOM.classList.toggle('item-checked');

        // changing isChecked
        $tasks.forEach(task => {
            if (taskDOM.dataset.id === task.id) {
                if (task.isChecked === false) task.isChecked = true;
                else if (task.isChecked === true) task.isChecked = false;
            }
        });

        // updating localStorage
        addTasksLS();
    }
    // delete one
    else if (e.target.closest('.todo__list-item-btn-del')) {
        deleteTask(e);
    }
    // delete all
    else if (e.target.closest('.todo__header-btn-del')) {
        deleteAllTasks(e);
    }
    // input
    else if (e.target.closest('.todo__insert-btn')) {
        createTask();
    }
}


// do stuff after DOMContentLoaded
//////////////////////////////////
document.addEventListener('DOMContentLoaded', init);