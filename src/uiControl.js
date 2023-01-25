import deleteIcon from './images/delete.svg';
import projectControl from './projectControl';

const uiControl = (() => {
  const setupPage = () => {
    // Set up the whole page layout
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.className = 'container';
    const todos = document.createElement('div');
    todos.className = 'todos';

    // Load it all up
    body.appendChild(container);
    container.appendChild(todos);
  };

  const drawTodos = (todos, projIndex) => {
    // Expects array of todos from the current projec
    const todoList = document.querySelector('.todos');
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      // Due date & title
      const todoSummary = document.createElement('div');
      todoSummary.className = 'todo-summary';
      todoSummary.setAttribute('data-index', todos.indexOf(todo));
      const dueDate = document.createElement('span');
      dueDate.textContent = todo.due;
      const title = document.createElement('span');
      title.textContent = todo.title;

      // Control buttons (details, delete. etc)
      const todoControl = document.createElement('div');
      todoControl.className = 'todo-control';
      const viewButton = document.createElement('button');
      viewButton.setAttribute('type', 'button');
      viewButton.textContent = 'DETAILS';
      viewButton.className = 'view-todo';
      viewButton.setAttribute('data-todoindex', todos.indexOf(todo));
      viewButton.setAttribute('data-projindex', projIndex);
      const deleteButton = document.createElement('input');
      deleteButton.setAttribute('type', 'image');
      deleteButton.setAttribute('src', deleteIcon);
      deleteButton.className = 'delete-todo';
      deleteButton.setAttribute('data-todoindex', todos.indexOf(todo));
      deleteButton.setAttribute('data-projindex', projIndex);

      // Load it all up
      todoList.appendChild(todoSummary);
      todoSummary.appendChild(dueDate);
      todoSummary.appendChild(title);
      todoSummary.appendChild(todoControl);
      todoControl.appendChild(viewButton);
      todoControl.appendChild(deleteButton);
    });
  };

  const addListeners = () => {
    const deleteButtons = document.querySelectorAll('.delete-todo');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        // Figure out who wants to be removed & do it
        const projIndex = event.target.dataset.projindex;
        const todoIndex = event.target.dataset.todoindex;
        const { todos } = projectControl.projects[projIndex];
        projectControl.projects[projIndex].removeTodo(todoIndex);
        // Gotta refresh the display & do the listeners again
        drawTodos(todos, projIndex);
        addListeners();
      });
    });
  };

  return { addListeners, drawTodos, setupPage };
})();

export default uiControl;
