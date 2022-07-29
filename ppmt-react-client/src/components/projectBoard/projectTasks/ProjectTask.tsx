import React, {FC, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import IProjectTask from "../../../models/ProjectTask"
import {useDeleteProjectTaskMutation} from "../../../features/backlog/backlog-slice"

interface Props {
    projectTask: IProjectTask
}

const ProjectTask:FC<Props> = ({projectTask}) => {

    const [deleteProjectTask] = useDeleteProjectTaskMutation()
    const [priorityString, setPriorityString] = useState<string>("")
    const [priorityClass, setPriorityClass] = useState<string>("")

    useEffect(() => {
        switch (projectTask.priority) {
            case 1:
                setPriorityString("HIGH")
                setPriorityClass("bg-danger text-light")
                break;
            case 2:
                setPriorityString("MEDIUM")
                setPriorityClass("bg-warning text-light")
                break;
            case 3:
                setPriorityString("LOW")
                setPriorityClass("bg-info text-light")
                break;
        }
        // eslint-disable-next-line
    }, [])

    const onDeleteClick = () => {
        if (window.confirm("Are you sure? This will delete the task")) {
            deleteProjectTask(projectTask)
        }
    }

    if(!projectTask) {
        return null;
    }

    return (
        <div className="card mb-1 bg-light">
            <div className={`card-header text-primary ${priorityClass}`}>
                ID: {projectTask.projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{projectTask.summary}</h5>
                <p className="card-text text-truncate ">
                {projectTask.acceptanceCriteria}
                </p>
                <Link
                    to={`/updateProjectTask/${projectTask.projectIdentifier}/${
                        projectTask.projectSequence
                    }`}
                    className="btn btn-primary"
                >
                    View / Update
                </Link>

                <button className="btn btn-danger ml-4" onClick={onDeleteClick}>Delete</button>
            </div>
        </div>
    )
}
export default ProjectTask