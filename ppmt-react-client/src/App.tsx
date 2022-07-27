import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddProject from "./components/project/AddProject"
import Dashboard from "./components/Dashboard"
import UpdateProject from "./components/project/UpdateProject"
import Header from "./components/layout/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

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
              </Routes>
          </div>
      </Router>
  )
}

export default App
