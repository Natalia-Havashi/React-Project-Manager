import { useState } from "react";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: Math.random(),
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleCancel() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }
  const selectedProject =
    projectsState.selectedProjectId != null
      ? projectsState.projects.find(
          (proj) => proj.id === projectsState.selectedProjectId
        )
      : null;
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartAddProject={handleStartAddProject}
        onProjects={projectsState}
        selectedProjectId={projectsState.selectedProjectId}
        onSelectProject={handleSelectProject}
      />
      {projectsState.selectedProjectId === null && (
        <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
      )}

      {selectedProject && (
        <SelectedProject
          title={selectedProject.title}
          date={selectedProject.dueDate}
          description={selectedProject.description}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={projectsState.tasks}
        />
      )}

      {projectsState.selectedProjectId === undefined && (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      )}
    </main>
  );
}

export default App;
