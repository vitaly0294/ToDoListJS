'use strict'

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed')

const todoData = localStorage.length !== 0 ? JSON.parse(localStorage.getItem('todoData')) : []

const render = function() {
  todoList.textContent = ''
  todoCompleted.textContent = '' 
  todoData.forEach((item, index, todoData) => {
    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                   '<div class="todo-buttons">' + 
                     '<button class="todo-remove"></button>' + 
                     '<button class="todo-complete"></button>' +
                   '</div>'
    if (item.completed) {
      todoCompleted.append(li)
    } else {
      todoList.append(li)
    }
    
    const btnTodoComplete = li.querySelector('.todo-complete')
    
    btnTodoComplete.addEventListener('click', () => {
      item.completed = !item.completed
      render()
    })

    const btnTodoRemove = li.querySelector('.todo-remove')

    btnTodoRemove.addEventListener('click', () => {
      todoData.splice(index, 1)
      render()
    })
  })

  localStorage.setItem('todoData' , JSON.stringify(todoData))
}

todoControl.addEventListener('submit', (event) => {
  event.preventDefault()
  if (headerInput.value.trim() !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false
    }
    todoData.push(newTodo)
  
    headerInput.value = ''
  
    render()
  } 
})

render()