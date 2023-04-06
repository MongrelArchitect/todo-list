import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import TodoFactory from './todos';
import ProjectFactory from './projects';
import projectControl from './projectControl';

const loginControl = (() => {
  const useGoogle = () => {
    let user;

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        user = result.user;
        const grayout = document.querySelector('.grayout');
        const loginContainer = document.querySelector('.login-container');
        grayout.className = 'grayout hidden';
        loginContainer.className = 'login-container hidden';
      });
  };

  const useLocalStorage = () => {
    localStorage.setItem('usingLocal', true);
    if (!localStorage.projects || localStorage.projects.length === 2) {
      // Either nothing in storage or the user deleted all projects.
      // Create a default project and add some todos.
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
  };

  return {
    useGoogle,
    useLocalStorage,
  };
})();

export default loginControl;
