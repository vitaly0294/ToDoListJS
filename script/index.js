'use strict'

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed'),
      body = document.querySelector('body');
const keyTodoData = 'todoData';

const todoData = JSON.parse(localStorage.getItem(keyTodoData)) || [];

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span>
                      <div class="todo-buttons" id="${index}"> 
                        <button class="todo-remove"></button>
                        <button class="todo-complete"></button>
                      </div>`;
    item.id = index;
    item.completed ? todoCompleted.append(li) : todoList.append(li);
  });
  localStorage.setItem(keyTodoData, JSON.stringify(todoData));
}

const startEventHendler = () => {
  body.addEventListener('click', e => {
    e.preventDefault();
    const event = e.target;
    if (event.matches('.todo-complete')) {
      todoData[event.closest('.todo-buttons').id].completed = !todoData[event.closest('.todo-buttons').id].completed;
      render();
    }
  
    if (event.matches('.todo-remove')) {
      todoData.splice([event.closest('.todo-buttons').id], 1);
      render();
    }
  
    if (event.matches('#add') && headerInput.value.trim() !== '') {
      const newTodo = {
        value: headerInput.value,
        completed: false
      }
      todoData.push(newTodo);
      headerInput.value = '';
      render();
    }
  })
}

render();
startEventHendler();