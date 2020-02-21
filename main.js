/* class */
    /* I decided to store each todo in a object, containing, beside the string, some methods to exclude and edit it */

class Todo {
    constructor(todo) {
        todo
    }
    
    
}


/* getting previous to-dos and updating it in the meantime */

const UList = document.querySelector('div#list ul');

let todos = JSON.parse(localStorage.getItem('to-dos')) || [] ;

updateTodos(todos); // it does a first call from the previous to-dos stored

function updateTodos(todos) { /* beyond creating a list item, this function also include some functions do edit and exclude the respective item */
    UList.textContent = '';
    for (let todo of todos) {
        let listItem = document.createElement('li');
        let deleteItem = document.createElement('li');
        let editItem = document.createElement('li');

        listItem.textContent = todo;

        UList.appendChild(listItem)
    }
}

/* writing to-dos and calling the storing*/

const mark = document.querySelector('form button');

mark.addEventListener('click', () => write(writeInput.value))

function write(todo) {
    if (todo.length === 0) {
        alert('Write something')
    } else {
        storingTodo(todo);
        writeInput.focus()
    }
}

/* storing to-dos */

function storingTodo(todo) {
    todos.push(todo);
    updateTodos(todos);
    localStorage.setItem('to-dos', JSON.stringify(todos))
}

/* Toggling form */

const form = document.querySelector('form');
const writeButton = document.querySelector('button#write');
const writeInput = document.querySelector('input[type=text]');


writeButton.addEventListener('click', () => {
    form.classList.toggle('hide');
    
    if (form.classList.value !== 'hide') {
        writeButton.textContent = 'Cancel';
        setTimeout(() => writeInput.focus(), 501) /* waits the transition ends to call the focus() method */
    } else {
        writeButton.textContent = 'Write new to-do';
    }
})

/* Toggling list */

const list = document.querySelector('div#list');
const showHide = document.querySelector('button#show-hide');

showHide.addEventListener('click', () => {
    list.classList.toggle('hide');
    
    list.classList.value === 'hide' ? showHide.textContent = 'Show list' : showHide.textContent = 'Hide List'
})