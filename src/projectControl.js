const projectControl = (() => {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
  };

  const removeProject = (index) => {
    projects.splice(index, 1);
  };

  const removeAllProjects = () => {
    projects.splice(0, projects.length);
  };

  return {
    projects, addProject, removeProject, removeAllProjects,
  };
})();

export default projectControl;
