import deleteIcon from './images/delete.svg';
import projectControl from './projectControl';
import ProjectFactory from './projects';

const uiControl = (() => {
  let currentProjectIndex = 0;

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

      // Todo details (initially hidden)
      const todoDetails = document.createElement('div');
      todoDetails.className = 'todo-details hidden';
      todoDetails.setAttribute('data-index', todos.indexOf(todo));
      const detailTitle = document.createElement('h3');
      detailTitle.textContent = todo.title;
      const detailDesc = document.createElement('h3');
      detailDesc.textContent = todo.desc;
      const detailDue = document.createElement('p');
      detailDue.textContent = `Due: ${todo.due}`;
      const detailPrior = document.createElement('p');
      detailPrior.textContent = `Priority: ${todo.prior}`;
      const detailDone = document.createElement('p');
      detailDone.textContent = `Done: ${todo.done ? 'Yes' : 'No'}`;
      const detailEdit = document.createElement('button');
      detailEdit.className = 'detail-edit';
      detailEdit.setAttribute('type', 'button');
      detailEdit.textContent = 'EDIT';
      const detailClose = document.createElement('button');
      detailClose.className = 'detail-close';
      detailClose.setAttribute('type', 'button');
      detailClose.textContent = 'CLOSE';

      // Load it all up
      todoList.appendChild(todoSummary);
      todoSummary.appendChild(todoDetails);
      todoSummary.appendChild(dueDate);
      todoSummary.appendChild(title);
      todoSummary.appendChild(todoControl);
      todoControl.appendChild(viewButton);
      todoControl.appendChild(deleteButton);
      todoDetails.appendChild(detailTitle);
      todoDetails.appendChild(detailDesc);
      todoDetails.appendChild(detailDue);
      todoDetails.appendChild(detailPrior);
      todoDetails.appendChild(detailDone);
      todoDetails.appendChild(detailEdit);
      todoDetails.appendChild(detailClose);
    });
  };

  const drawProjects = () => {
    // Show all availbe projects
    const allProjects = projectControl.projects;

    const ul = document.querySelector('.projects-list');
    ul.innerHTML = '';

    allProjects.forEach((project) => {
      const li = document.createElement('li');
      li.className = 'project-list-item';
      li.setAttribute('data-index', allProjects.indexOf(project));
      if (currentProjectIndex === allProjects.indexOf(project)) {
        li.classList.add('active');
      }
      li.textContent = project.name;
      ul.appendChild(li);
    });
  };

  const setupDetailListeners = () => {
    // For viewing details on an individual todo
    const detailButtons = document.querySelectorAll('.view-todo');
    detailButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const allDetails = document.querySelectorAll('.todo-details');
        allDetails.forEach((detail) => {
          // Figure out who wants to be shown & do it
          if (event.target.dataset.todoindex === detail.dataset.index) {
            detail.classList.remove('hidden');
            const grayout = document.querySelector('.grayout');
            grayout.classList.remove('hidden');
          }
        });
      });
    });
  };

  const setupCloseListeners = () => {
    // For closing a todo's detail view
    const closeButtons = document.querySelectorAll('.detail-close');
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const allDetails = document.querySelectorAll('.todo-details');
        // Just hide any that match, don't fuddle with indexes
        allDetails.forEach((detail) => {
          if (!detail.classList.contains('hidden')) {
            const grayout = document.querySelector('.grayout');
            grayout.classList.add('hidden');
            detail.classList.add('hidden');
          }
        });
      });
    });
  };

  const setupDeleteListeners = () => {
    // For deleting todos from a given project
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
        setupDeleteListeners();
        setupDetailListeners();
        setupCloseListeners();
      });
    });
  };

  const setupProjectListeners = () => {
    // For selecting which project's todos are currently displayed
    const projectListItems = document.querySelectorAll('.project-list-item');
    projectListItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        const selectedProject = projectControl.projects[index];
        currentProjectIndex = +index;
        // Draw the selected project's todos & add listeners
        drawProjects();
        drawTodos(selectedProject.todos, index);
        setupDeleteListeners();
        setupDetailListeners();
        setupCloseListeners();
        setupProjectListeners();
      });
    });
  };

  const submitNewProject = () => {
    // Create new project & display it's todos (obviously empty at first)
    const newProjectButton = document.querySelector('#submit-new-project');
    newProjectButton.addEventListener('click', () => {
      const newTitle = document.querySelector('#new-project-title');
      const newProject = ProjectFactory(newTitle.value);
      projectControl.addProject(newProject);
      currentProjectIndex = projectControl.projects.indexOf(newProject);
      drawProjects();
      drawTodos(newProject.todos, projectControl.projects.indexOf(newProject));
      setupProjectListeners();
    });
  };

  return {
    drawProjects,
    drawTodos,
    setupCloseListeners,
    setupDeleteListeners,
    setupDetailListeners,
    setupProjectListeners,
    submitNewProject,
  };
})();

export default uiControl;
