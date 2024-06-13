import { useState } from "react";
import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import ProjectsSidebar from "./Components/ProjectsSidebar.jsx";
import SelectedProject from "./Components/SelectedProject.jsx";

function App() {
  const [projectState,setProjectState]=useState({
    selectedProjectId:undefined,
    projects: [],
    tasks:[]
  })

  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newtask = {
          text: text,
          projectId: prevState.selectedProjectId,
          id:taskId
      }
      return {
        ...prevState,
        tasks:[newtask,...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectState((prevState)=> {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState=> {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    })
  }
  function handleStartProject(){
    setProjectState(prevState=> {
      return{
        ...prevState,
        selectedProjectId: null,
      }
    })
  }
  function handleAddProject (projectData){
    setProjectState(prevState => {
      const projectId = Math.random()
      const newProject = {
          ...projectData,
          id:projectId
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }
  function handleCancelProject(){
    setProjectState((prevState)=> {
      return {
        ...prevState,
        selectedProjectId:undefined,
      }
    })
  }
  function handleDeleteProject(){
    setProjectState((prevState)=> {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let contant  = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;
  if(projectState.selectedProjectId === undefined){
    contant = <NoProjectSelected onStartAddProject={handleStartProject}/>
  } else if (projectState.selectedProjectId === null){
    contant = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartProject} projects={projectState.projects} onSelectProject={handleSelectProject}/>
      {contant}
    </main>
  );
}

export default App;
