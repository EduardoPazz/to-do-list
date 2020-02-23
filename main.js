/* Handling Data Scripts */

    /* getting previous to-dos and updating it in the meantime */

const UList = document.querySelector('div#list ul');

let todos = JSON.parse(localStorage.getItem('to-dos')) || [] ; // fetch from the localStorage the previous to-dos. If nothing stands there, a empty array is created

updateTodos(todos); // it does a first call from the previous to-dos stored

function updateTodos(todos) { /* beyond creating a list item, this function also include a way of excluding the respective item and a checkbox to it*/
    UList.textContent = ''; // empty the list

    for (let todo of todos) { // fetch all the todos 
        let listItem = document.createElement('li');
        let excludeButton = document.createElement('button');
        let checkBox = document.createElement('div');

        checkBox.setAttribute('id', 'checkbox');

        listItem.textContent = todo;
        excludeButton.textContent = '🗑️';

        checkBox.addEventListener('click', evt => {
            evt.target.classList.toggle('checked')
            listItem.classList.toggle('checked')
        })

        excludeButton.addEventListener('click', () => excludingTodo(listItem));

        UList.appendChild(listItem);
        listItem.insertAdjacentElement('beforebegin', checkBox) // positionate the excludeButton right after de listItem
        listItem.insertAdjacentElement('afterend', excludeButton) // positionate the excludeButton right after de listItem
    }
}


    /* testing writeInput and calling the storing*/

const mark = document.querySelector('form button');

mark.addEventListener('click', () => testing(writeInput.value))

function testing(todo) {
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


    /* Excluding to-dos */

function excludingTodo(todo) { // here we get only the textContent of the to-do, not exactly the array element. Thus, we have to find the correspondent element of the array and update the list and the localStorage interely
    const position = todos.indexOf(todo.textContent); // it finds the correspondent index of the value parsed

    todos.splice(position, 1); // exclude the item from the original array

    updateTodos(todos);

    localStorage.setItem('to-dos', JSON.stringify(todos)) // this brand new setItem overwrite the previous one
}


/* User-Interface Scripts */

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