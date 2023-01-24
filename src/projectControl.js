const projectControl = (() => {
  const projects = [];
  const addProject = (project) => {
    projects.push(project);
  };
  const removeProject = (index) => {
    projects.splice(index, 1);
  };

  return { projects, addProject, removeProject };
})();

export default projectControl;
