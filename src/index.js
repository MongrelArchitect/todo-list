import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import './styles/reset.css';
import './styles/style.css';
import storageIcon from './images/storage.svg';

import ProjectFactory from './projects';
import TodoFactory from './todos';
import projectControl from './projectControl';
import uiControl from './uiControl';
import databaseControl from './database';

const firebaseConfig = {
  apiKey: 'AIzaSyBRBj-efijWMPHre-Q7yQHJNxyWnl5zrTI',
  authDomain: 'todo-list-89ba6.firebaseapp.com',
  projectId: 'todo-list-89ba6',
  storageBucket: 'todo-list-89ba6.appspot.com',
  messagingSenderId: '1066176488365',
  appId: '1:1066176488365:web:87346f6c6a6e627efef724',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

// XXX
// localStorage.clear();
// auth.signOut();
// XXX

if (!localStorage.usingLocal) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      uiControl.chooseLoginMethod();
    } else {
      // TODO
      uiControl.showUserInfo(user);

      databaseControl.setDatabase(user.uid, db);
      // Create new user in firestore (if they don't already exist)
      databaseControl.createUser(user.uid, db);
      // Load up the users projects from firestore
      databaseControl.loadProjects(user.uid, db);
    }
  });
} else {
  // We're using local storage, so load up our projects
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
  uiControl.showUserInfo({
    displayName: 'Local Storage',
    photoURL: storageIcon,
  });
  uiControl.drawTodos(
    projectControl.projects.length > 0 ? projectControl.projects[0].todos : [],
    0,
  );
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
