import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './styles/reset.css';
import './styles/style.css';

import ProjectFactory from './projects';
import TodoFactory from './todos';
import projectControl from './projectControl';
import uiControl from './uiControl';

const firebaseConfig = {
  apiKey: 'AIzaSyBRBj-efijWMPHre-Q7yQHJNxyWnl5zrTI',
  authDomain: 'todo-list-89ba6.firebaseapp.com',
  projectId: 'todo-list-89ba6',
  storageBucket: 'todo-list-89ba6.appspot.com',
  messagingSenderId: '1066176488365',
  appId: '1:1066176488365:web:87346f6c6a6e627efef724',
};

initializeApp(firebaseConfig);

if (!localStorage.usingLocal) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      uiControl.chooseLoginMethod();
    }
  });
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
}
