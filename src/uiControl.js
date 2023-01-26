import deleteIcon from './images/delete.svg';
import projectControl from './projectControl';
import ProjectFactory from './projects';
import TodoFactory from './todos';

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
      detailEdit.setAttribute('data-index', todos.indexOf(todo));
      detailEdit.textContent = 'EDIT';
      const detailClose = document.createElement('button');
      detailClose.className = 'detail-close';
      detailClose.setAttribute('type', 'button');
      detailClose.textContent = 'CLOSE';

      // Todo edit form (initially hidden)
      const todoEdit = document.createElement('div');
      todoEdit.className = 'todo-edit hidden';
      todoEdit.setAttribute('data-index', todos.indexOf(todo));
      const editHeading = document.createElement('h3');
      editHeading.textContent = 'Edit Todo:';
      const editForm = document.createElement('form');
      const titleLabel = document.createElement('label');
      titleLabel.setAttribute('for', 'edit-title');
      titleLabel.textContent = 'Title:';
      const editTitle = document.createElement('input');
      editTitle.setAttribute('type', 'text');
      editTitle.setAttribute('id', 'edit-title');
      editTitle.value = todo.title;
      const descLabel = document.createElement('label');
      descLabel.setAttribute('for', 'edit-desc');
      descLabel.textContent = 'Description:';
      const editDesc = document.createElement('input');
      editDesc.setAttribute('type', 'text');
      editDesc.setAttribute('id', 'edit-desc');
      editDesc.value = todo.desc;
      const dueLabel = document.createElement('label');
      dueLabel.setAttribute('for', 'edit-due');
      dueLabel.textContent = 'Due Date:';
      const editDue = document.createElement('input');
      editDue.setAttribute('type', 'date');
      editDue.setAttribute('id', 'edit-due');
      editDue.value = todo.due;
      const priorLabel = document.createElement('label');
      priorLabel.setAttribute('for', 'edit-prior');
      priorLabel.textContent = 'Priority:';
      const editPrior = document.createElement('select');
      editPrior.setAttribute('id', 'edit-prior');
      const lowPrior = document.createElement('option');
      lowPrior.setAttribute('value', 'Low');
      lowPrior.textContent = 'Low';
      const medPrior = document.createElement('option');
      medPrior.setAttribute('value', 'Medium');
      medPrior.textContent = 'Medium';
      const highPrior = document.createElement('option');
      highPrior.setAttribute('value', 'High');
      highPrior.textContent = 'High';
      // Gotta populate the dropdown to select the proper priority
      editPrior.appendChild(lowPrior);
      editPrior.appendChild(medPrior);
      editPrior.appendChild(highPrior);
      for (let i = 0; i < editPrior.length; i += 1) {
        if (editPrior.options[i].value === todo.prior) {
          editPrior.options[i].selected = true;
        }
      }
      const doneLabel = document.createElement('label');
      doneLabel.setAttribute('for', 'edit-done');
      doneLabel.textContent = 'Done:';
      const editDone = document.createElement('input');
      editDone.setAttribute('type', 'checkbox');
      editDone.setAttribute('id', 'edit-done');
      if (todo.done) {
        editDone.checked = true;
      } else {
        editDone.checked = false;
      }
      const submitEdit = document.createElement('button');
      submitEdit.setAttribute('type', 'button');
      submitEdit.setAttribute('class', 'submit-edit');
      submitEdit.textContent = 'SUBMIT';
      const cancelEdit = document.createElement('button');
      cancelEdit.setAttribute('type', 'button');
      cancelEdit.setAttribute('class', 'cancel-edit');
      cancelEdit.textContent = 'CANCEL';

      // Load it all up
      todoList.appendChild(todoSummary);
      todoSummary.appendChild(todoDetails);
      todoSummary.appendChild(dueDate);
      todoSummary.appendChild(title);
      todoSummary.appendChild(todoControl);
      todoControl.appendChild(viewButton);
      todoControl.appendChild(deleteButton);

      todoDetails.appendChild(todoEdit);
      todoEdit.appendChild(editHeading);
      todoEdit.appendChild(editForm);
      editForm.appendChild(titleLabel);
      titleLabel.appendChild(editTitle);
      editForm.appendChild(descLabel);
      descLabel.appendChild(editDesc);
      editForm.appendChild(dueLabel);
      dueLabel.appendChild(editDue);
      editForm.appendChild(priorLabel);
      priorLabel.appendChild(editPrior);
      editForm.appendChild(doneLabel);
      doneLabel.appendChild(editDone);
      editForm.appendChild(submitEdit);
      editForm.appendChild(cancelEdit);

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

  const setupEditListeners = () => {
    // For editing a selected todo
    const allEditButtons = document.querySelectorAll('.detail-edit');
    allEditButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        const allEditSections = document.querySelectorAll('.todo-edit');
        allEditSections.forEach((section) => {
          if (index === section.dataset.index) {
            section.classList.remove('hidden');
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

  const createNewTodo = () => {
    const submit = document.querySelector('#new-todo');
    submit.addEventListener('click', () => {
      // Create new todo for currently selected project
      const newTitle = document.querySelector('#new-title').value;
      const newDesc = document.querySelector('#new-desc').value;
      const newDue = document.querySelector('#new-due').value;
      const newPrior = document.querySelector('#new-prior').value;

      const newTodo = TodoFactory(newTitle, newDesc, newDue, newPrior, false);
      const currentProject = projectControl.projects[currentProjectIndex];
      currentProject.addTodo(newTodo);
      drawTodos(currentProject.todos, currentProjectIndex);
      setupDeleteListeners();
      setupDetailListeners();
      setupCloseListeners();
    });
  };

  const editTodo = () => {
    // do something
  };

  return {
    createNewTodo,
    drawProjects,
    drawTodos,
    setupCloseListeners,
    setupDeleteListeners,
    setupDetailListeners,
    setupEditListeners,
    setupProjectListeners,
    submitNewProject,
  };
})();

export default uiControl;
