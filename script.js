'use strict';

// ## Funkcjonalność
// Aplikacja wyświetla listę zadań do wykonania. Zadania podzielone są na *wykonane* oraz *do zrobienia*.
//   - Zadania *wykonane* są przekreślone i są oznaczone kolorem (`#9eb2c0`) i zaznaczonym polem wyboru po lewej stronie.
//   - Zadania *do zrobienia* są oznaczone kolorem (`#2e3641`) i niezaznaczonym polem wyboru po lewej stronie.
//   - Pod listą zadań zawsze wyświetla się pole z możliwością dodania nowego zadania. Nowe zadanie jest zawsze *do zrobienia*
//   - Po dodaniu nowego zadania, dodawane jest ono nad polem dodawana nowego zadania. Pole z możliwością dodania nowego zadania jest zawsze na samym dole listy.
//   - Nie można dodać zadania bez wpisania tytułu (trzeba dodać wizualną walidację).
//   - Każde zadanie można usunąć poprzez kliknięcie w ikonę kosza.

//   - W prawym górnym rogu dodajmy przycisk, który pozwola usunąć wszystkie taski.

//   - **Uwaga!** Aktualny stan listy zapisany jest w LocalStorage.
//   - Jeśli mamy zapisaną w LocalStorage liste, powinna się ona pojawić od razu po załadowaniu skryptu

//              _           _
//    ___  ___| | ___  ___| |_ ___  _ __ ___
//   / __|/ _ | |/ _ \/ __| __/ _ \| '__/ __|
//  \__ |  __| |  __| (__| || (_) | |  \__ \
// |___/\___|_|\___|\___|\__\___/|_|  |___/

// const checkbox = document.querySelector('input[type=checkbox]');
// console.log(checkbox);
// console.log(checkbox.checked);

let $todoBtnAdd; // button dodawania taska
let $todoInput; // znacznik <input> 
let $todoList; // kontener na taski
let $newTask; // nowo dodany task
let $todoCont; // kontener całej aplikacji

let $idNumber = localStorage.getItem('$idNumber') ?? 0; // id ostatnio dodanego taska
let $inputVal; // zawartość todo


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

const loadTasks = () => {
    if ($idNumber > 0) {
        for (let i = 0; i < $idNumber; i++) {
            const html = localStorage.getItem(`todo-${i}`);

            if (html !== null) {
                $todoList.insertAdjacentHTML('beforeend', html);
            }
        }
    }
}

const addTodo = () => {
    if ($todoInput.value !== '') {
        $inputVal = $todoInput.value;
        // localStorage.setItem(${})
        $idNumber = localStorage.getItem('$idNumber') ?? 0;
        $todoInput.placeholder = '';

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
        $todoInput.value = '';

        localStorage.setItem(`todo-${$idNumber}`, html);
        $idNumber++;
        localStorage.setItem('$idNumber', $idNumber);
    }
    else {
        $todoInput.placeholder = 'Uzupełnij pole!';
    }
}

const deleteTask = e => {
    const task = e.target.closest('.todo__list-item');
    localStorage.removeItem(task.id);
    task.remove();
}

const deleteAllTasks = e => {
    // here
}

const isEnter = e => {
    if (e.keyCode === 13) {
        addTodo();
    }
}

const checkClick = e => {
    // jeżeli jest to input:checkbox
    if (e.target.classList.contains('todo__list-item-btn-check')) {
        e.target.closest('.todo__list-item').classList.toggle('item-checked');
    }
    else if (e.target.closest('.todo__list-item-btn-del')) {
        deleteTask(e);
    }
}

//                         _        _ _     _
//   _____   _____ _ __  | |_     | (_)___| |_ ___ _ __   ___ _ __ ___
//  / _ \ \ / / _ | '_ \| _______| | / __| __/ _ | '_ \ / _ | '__/ __|
// |  __/\ V |  __| | | | ||_____| | \__ | ||  __| | | |  __| |  \__ \
// \___| \_/ \___|_| |_|\__|    |_|_|___/\__\___|_| |_|\___|_|  |___/


//      __                  _   _
//    / _|_   _ _ __   ___| |_(_) ___  _ __  ___
//   | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//  |  _| |_| | | | | (__| |_| | (_) | | | \__ \
// |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

document.addEventListener('DOMContentLoaded', init);
