import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "./app/hooks"
import ProtectedRoute, {ProtectedRouteProps} from "./securityUtils/ProtectedRoute"
import AddProject from "./components/project/AddProject"
import Dashboard from "./components/Dashboard"
import UpdateProject from "./components/project/UpdateProject"
import ProjectBoard from "./components/projectBoard/ProjectBoard"
import AddProjectTask from "./components/projectBoard/projectTasks/AddProjectTask"
import Header from "./components/layout/Header"
import UpdateProjectTask from "./components/projectBoard/projectTasks/UpdateProjectTask"
import Landing from "./components/layout/Landing"
import Register from "./components/userManagement/Register"
import Login from "./components/userManagement/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

function App() {

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.auth.value)

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
        isAuthenticated: !!currentUser,
        authenticationPath: "/login",
    }

    return (
        <Router>
            <div className="App">
                <Header currentUser={currentUser}/>
                <Routes>
                    {
                        //Public Routes
                    }
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>

                    {
                        //Private Routes
                    }
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                outlet={<Dashboard />}
                            />
                        }
                    />
                    <Route
                        path="/addProject"
                        element={
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                outlet={<AddProject />}
                            />
                        }
                    />
                    <Route
                        path="/updateProject/:id"
                        element={
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                outlet={<UpdateProject />}
                            />
                        }
                    />
                    <Route
                        path="/projectBoard/:id"
                        element={
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                outlet={<ProjectBoard />}
                            />
                        }
                    />
                    <Route
                        path="/addProjectTask/:id"
                        element={
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                outlet={<AddProjectTask />}
                            />
                        }
                    />
                    <Route
                        path="/updateProjectTask/:backlogId/:ptId"
                        element={
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                outlet={<UpdateProjectTask />}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
