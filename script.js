'use strict';
//                      _       _     _
//    __   ____ _ _ __(_) __ _| |__ | | ___ ___
//   \ \ / / _` | '__| |/ _` | '_ \| |/ _ / __|
//   \ V | (_| | |  | | (_| | |_) | |  __\__ \
//   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___|___/

let $todoBtnAdd; // button dodawania taska
let $todoInput; // znacznik <input> 
let $todoList; // kontener na taski
let $newTask; // nowo dodany task
let $todoCont; // kontener całej aplikacji

let $idNumber = localStorage.getItem('$idNumber') ?? 0; // id ostatnio dodanego taska
let $inputVal; // zawartość todo

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
    $todoBtnAdd.addEventListener('click', addTodo);
    $todoInput.addEventListener('keyup', isEnter);
    $todoCont.addEventListener('click', checkClick);
}

//      __                  _   _
//    / _|_   _ _ __   ___| |_(_) ___  _ __  ___
//   | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//  |  _| |_| | | | | (__| |_| | (_) | | | \__ \
// |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

// it loads all tasks from localStorage
const loadTasks = () => {
    if ($idNumber > 0) {
        // requires a better solution
        for (let i = 0; i < $idNumber; i++) {
            const html = localStorage.getItem(`todo-${i}`);

            if (html !== null) {
                $todoList.insertAdjacentHTML('beforeend', html);
            }
        }
    }
}

// it adds todo in DOM and in localStorage
const addTodo = () => {
    if ($todoInput.value !== '') {
        $inputVal = $todoInput.value;
        $idNumber = localStorage.getItem('$idNumber') ?? 0;

        const html = `
        <div id="todo-${$idNumber}" class="todo__list-item">
            <div class="todo__list-item-btn">
                <input class="todo__list-item-btn-check" type="checkbox">
            </div>
            <div class="todo__list-item-content">${$inputVal}</div>
            <button class="todo__list-item-btn  todo__list-item-btn-del">
                <img src="img/trash.svg" alt="trash">
            </button>
        </div>
        `;
        $todoList.insertAdjacentHTML('beforeend', html);

        // clearing placeholder & input value
        $todoInput.placeholder = '';
        $todoInput.value = '';

        // adding task and idNumber to localStorage
        localStorage.setItem(`todo-${$idNumber}`, html);
        $idNumber++;
        localStorage.setItem('$idNumber', $idNumber);
    }
    else {
        $todoInput.placeholder = 'Uzupełnij pole!';
    }
}

// it deletes only selected task in DOM and in localStorage
const deleteTask = e => {
    const task = e.target.closest('.todo__list-item');
    localStorage.removeItem(task.id);
    task.remove();
}

// it deletes all tasks in DOM and in localStorage
const deleteAllTasks = () => {
    const allTasks = document.querySelectorAll('.todo__list-item');
    localStorage.clear();
    allTasks.forEach(task => {
        task.remove();
    });
}

// if ENTER is pressed, then addTodo()
const isEnter = e => {
    if (e.keyCode === 13) {
        addTodo();
    }
}

// if button clicked
const checkClick = e => {
    if (e.target.classList.contains('todo__list-item-btn-check')) {
        e.target.closest('.todo__list-item').classList.toggle('item-checked');
    }
    else if (e.target.closest('.todo__header-btn-del')) {
        deleteAllTasks(e);
    }
    else if (e.target.closest('.todo__list-item-btn-del')) {
        deleteTask(e);
    }
}


// do stuff after DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);