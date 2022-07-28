import React, {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import Backlog from "./Backlog"
import {useFetchProjectTasksQuery} from "../../features/backlog/backlog-slice"
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

const ProjectBoard = () => {

    const {id} = useParams()

    const [errorMessage, setErrorMessage] = useState<string>()

    const {data = [], error} = useFetchProjectTasksQuery(id!)

    useEffect(() => {
        if (!!error) {
            const e1 = (error as FetchBaseQueryError)?.data
            const e2 = (error as SerializedError)?.message
            if(e1) {
                setErrorMessage(JSON.stringify(e1))
            }
            if(e2) {
                setErrorMessage(e2 as string)
            }
        }
    }, [error])

    if (!data) {
        return null
    }

    return (
        <div className="container">
            {
                !!errorMessage
                    ? <div className="alert alert-danger">{errorMessage}</div>
                    : <>
                        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                            <i className="fas fa-plus-circle"> Create Project Task</i>
                        </Link>
                        <br/>
                        {errorMessage &&
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        }
                        <hr/>
                        <Backlog projectTasks={[...data].sort((a, b) => a.priority - b.priority)}/>
                    </>
            }

        </div>
    )
}

export default ProjectBoard;