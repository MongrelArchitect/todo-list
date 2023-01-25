import './styles/reset.css';
import './styles/style.css';

import TodoFactory from './todos';
import ProjectFactory from './projects';
import projectControl from './projectControl';
import uiControl from './uiControl';

// Create a default project and add some todos
projectControl.addProject(ProjectFactory('default project'));
projectControl.projects[0].addTodo(
  TodoFactory(
    'Read Book',
    'Finish "Human Action" by Ludwig von Mises',
    '02/30/23',
    'low',
    false,
  ),
);
projectControl.projects[0].addTodo(
  TodoFactory(
    'New Battery',
    'Buy and install a new battery for the Subaru',
    '02/15/23',
    'high',
    true,
  ),
);
projectControl.projects[0].addTodo(
  TodoFactory(
    'Cousin\'s B-Day',
    'Call Liz to wish her a happy birthday',
    '03/12/23',
    'high',
    false,
  ),
);

uiControl.setupPage();
uiControl.drawTodos(projectControl.projects[0].todos, 0);
uiControl.setupDeleteListeners(0);
uiControl.setupDetailListeners();
uiControl.setupCloseListeners();
