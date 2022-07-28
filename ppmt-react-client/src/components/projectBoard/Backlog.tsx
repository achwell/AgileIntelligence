import React, {FC} from "react"
import ProjectTask from "./projectTasks/ProjectTask"
import IProjectTask from "../../models/ProjectTask"

interface Props {
    projectTasks: IProjectTask[]
}

const Backlog:FC<Props> = ({projectTasks}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {
                        projectTasks.filter(projectTask => projectTask.status === "TO_DO").map(projectTask => {
                            return <ProjectTask key={projectTask.id} projectTask={projectTask}/>
                        })
                    }
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {
                        projectTasks.filter(projectTask => projectTask.status === "IN_PROGRESS").map(projectTask => {
                            return <ProjectTask key={projectTask.id} projectTask={projectTask}/>
                        })
                    }
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {
                        projectTasks.filter(projectTask => projectTask.status === "DONE").map(projectTask => {
                            return <ProjectTask key={projectTask.id} projectTask={projectTask}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Backlog