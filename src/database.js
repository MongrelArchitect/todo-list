import { doc, setDoc, getDoc } from 'firebase/firestore';
import projectControl from './projectControl';
import ProjectFactory from './projects';
import TodoFactory from './todos';
import uiControl from './uiControl';

const databaseControl = (() => {
  let database;
  let id;

  const setDatabase = (uid, db) => {
    database = db;
    id = uid;
  };

  const createUser = async (uid, db) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // First login, so load some default projects
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
            "Brother's B-Day",
            'Call Ryan to wish him a happy birthday',
            '2023-10-03',
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

        await setDoc(docRef, {
          projects: JSON.stringify(projectControl.projects),
        });
      }
    } catch (error) {
      console.error('Firestore error: ', error);
    }
  };

  const loadProjects = async (uid, db) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      const loadedProjects = JSON.parse(docSnap.data().projects);
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
      uiControl.drawTodos(
        projectControl.projects.length > 0
          ? projectControl.projects[0].todos
          : [],
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
    } catch (error) {
      console.error('Firestore error: ', error);
    }
  };

  const updateProjects = async () => {
    try {
      const docRef = doc(database, 'users', id);
      await setDoc(docRef, {
        projects: JSON.stringify(projectControl.projects),
      });
    } catch (error) {
      console.error('Firestore error: ', error);
    }
  };

  return {
    createUser,
    loadProjects,
    setDatabase,
    updateProjects,
  };
})();

export default databaseControl;
