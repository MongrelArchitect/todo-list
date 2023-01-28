import './styles/reset.css';
import './styles/style.css';

import TodoFactory from './todos';
import ProjectFactory from './projects';
import projectControl from './projectControl';
import uiControl from './uiControl';

if (!localStorage.projects) {
  // Nothing in storage, so create a default project and add some todos
  projectControl.addProject(ProjectFactory('default project'));
  projectControl.projects[0].addTodo(
    TodoFactory(
      'Read Book',
      'Finish "Human Action" by Ludwig von Mises',
      '2023-01-30',
      'Low',
      false,
    ),
  );
  projectControl.projects[0].addTodo(
    TodoFactory(
      'New Battery',
      'Buy and install a new battery for the Subaru',
      '2023-02-15',
      'Medium',
      false,
    ),
  );
  projectControl.projects[0].addTodo(
    TodoFactory(
      "Cousin's B-Day",
      'Call Liz to wish her a happy birthday',
      '2023-03-12',
      'High',
      false,
    ),
  );
  projectControl.projects[0].addTodo(
    TodoFactory(
      'Done',
      "Whatever it was, it's finished",
      '2022-12-12',
      'Medium',
      true,
    ),
  );
} else {
  // We have at least one project stored, load em all up
  const loadedProjects = JSON.parse(localStorage.projects);
  for (let i = 0; i < loadedProjects.length; i += 1) {
    // Load up the projects
    projectControl.addProject(ProjectFactory(loadedProjects[i].name));
    for (let j = 0; j < loadedProjects[i].todos.length; j += 1) {
      // Load up the todos
      const loadedTodo = loadedProjects[i].todos[j];
      projectControl.projects[i].addTodo(
        TodoFactory(
          loadedTodo.title,
          loadedTodo.desc,
          loadedTodo.due,
          loadedTodo.prior,
          loadedTodo.done,
        ),
      );
    }
  }
}

uiControl.drawTodos(projectControl.projects[0].todos, 0);
uiControl.drawProjects();
uiControl.createNewTodo();
uiControl.setupDeleteListeners(0);
uiControl.setupDetailListeners();
uiControl.setupCloseListeners();
uiControl.setupEditListeners();
uiControl.setupProjectListeners();
uiControl.submitNewProject();
uiControl.editTodo();
