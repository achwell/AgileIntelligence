import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddProject from "./components/project/AddProject"
import Dashboard from "./components/Dashboard"
import UpdateProject from "./components/project/UpdateProject"
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/projectTasks/AddProjectTask";
import Header from "./components/layout/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import UpdateProjectTask from "./components/projectBoard/projectTasks/UpdateProjectTask";

function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/addProject" element={<AddProject/>}/>
                  <Route path="/updateProject/:id" element={<UpdateProject/>}/>
                  <Route path="/projectBoard/:id" element={<ProjectBoard/>} />
                  <Route path="/addProjectTask/:id" element={<AddProjectTask/>}/>
                  <Route path="/updateProjectTask/:backlogId/:ptId" element={<UpdateProjectTask/>}/>
              </Routes>
          </div>
      </Router>
  )
}

export default App
