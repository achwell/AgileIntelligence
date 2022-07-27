import React from "react"
import ProjectItem from "./project/ProjectItem"
import CreateProjectButton from "./project/CreateProjectButton"
import {useFetchProjectsQuery} from "../features/project/projectapi-slice"

const Dashboard = () => {

    const {data = [], isFetching} = useFetchProjectsQuery()

    return (
        <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Projects</h1>
                        <br/>
                        <CreateProjectButton />
                        <br/>
                        <hr/>
                        { !isFetching && data.map(project => <ProjectItem key={project.projectIdentifier} project={project}/>) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard