import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {Controller, useForm} from "react-hook-form";
import {useFetchProjectTaskQuery, useUpdateProjectTaskMutation} from "../../../features/backlog/backlog-slice";
import IProjectTask from "../../../models/ProjectTask";
import {useFetchProjectQuery} from "../../../features/project/projectapi-slice";
import DatePicker from "react-datepicker";

const UpdateProjectTask = () => {

    const {backlogId, ptId} = useParams()
    const [errorMessage, setErrorMessage] = useState<string>()

    const {control, formState: {errors, isSubmitted}, handleSubmit, register, reset, watch} = useForm<IProjectTask>()
    const [updateProjectTask] = useUpdateProjectTaskMutation()
    const {data: projectTask, error: projectTaskError} = useFetchProjectTaskQuery({
        backlogId: backlogId!,
        sequence: ptId!
    })
    const {data: project, error: projectError} = useFetchProjectQuery(backlogId!)

    useEffect(() => {
        if (projectTask) {
            reset(projectTask)
        }
        // eslint-disable-next-line
    }, [projectTask])

    useEffect(() => {
        if (!!projectTaskError) {
            const e1 = (projectTaskError as FetchBaseQueryError)?.data
            const e2 = (projectTaskError as SerializedError)?.message
            if (e1) {
                setErrorMessage(JSON.stringify(e1))
            }
            if (e2) {
                setErrorMessage(e2 as string)
            }
        }
        if (!!projectError) {
            const e1 = (projectError as FetchBaseQueryError)?.data
            const e2 = (projectError as SerializedError)?.message
            if (e1) {
                setErrorMessage(JSON.stringify(e1))
            }
            if (e2) {
                setErrorMessage(e2 as string)
            }
        }
    }, [projectTaskError, projectError])

    const onSubmit = (data: IProjectTask) => {
        updateProjectTask(data)
            .then((response: { data: IProjectTask } | { error: FetchBaseQueryError | SerializedError }) => {
                console.log({response})
            })
            .catch(error => {
                console.error({error})
                setErrorMessage(error)
            })
    }

    const dueDate = watch("dueDate")

    if (!projectTask || !project) {
        return null
    }

    return (
        <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${backlogId}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Update Project Task</h4>
                        <p className="lead text-center">{project.projectName} - {project.projectIdentifier}</p>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate
                              className={isSubmitted ? 'was-validated' : ''}>
                            {errorMessage &&
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            }
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Project Task summary"
                                    required
                                    {...register("summary", {
                                        required: "Project Task summary is required.",
                                        maxLength: 255
                                    })}
                                />
                                {errors.summary && errors.summary.message &&
                                    <div className="invalid-feedback">
                                        {errors.summary.message}
                                    </div>}
                            </div>
                            <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        {...register("acceptanceCriteria")}
                                    />
                                {errors.acceptanceCriteria && errors.acceptanceCriteria.message &&
                                    <div className="invalid-feedback">
                                        {errors.acceptanceCriteria.message}
                                    </div>}
                            </div>
                            <div className="form-group">
                                <h6>Due Date</h6>
                                <Controller
                                    control={control}
                                    name="dueDate"
                                    render={({field: {name, value, onChange, onBlur}}) =>
                                        <DatePicker
                                            name={name}
                                            value={value ? new Date(value).toLocaleDateString() : undefined}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            dateFormat="dd.MM.yyyy"
                                            minDate={new Date()}
                                            className="form-control form-control-lg"
                                            selected={dueDate ? new Date(dueDate) : undefined}
                                            showTimeSelect={false}
                                            todayButton="I dag"
                                            dropdownMode="select"
                                            isClearable
                                            placeholderText="Click to select time"
                                            shouldCloseOnSelect
                                        />}
                                />
                                {errors.dueDate && errors.dueDate.message &&
                                    <div className="invalid-feedback">
                                        {errors.dueDate.message}
                                    </div>}
                            </div>
                            <div className="form-group">
                                <h6>Select Priority</h6>
                                <select {...register("priority")} className="form-control form-control-lg">
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </select>
                                {errors.priority && errors.priority.message &&
                                    <div className="invalid-feedback">
                                        {errors.priority.message}
                                    </div>}
                            </div>

                            <div className="form-group">
                                <h6>Select Status</h6>
                                <select {...register("status")} className="form-control form-control-lg">
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                                {errors.status && errors.status.message &&
                                    <div className="invalid-feedback">
                                        {errors.status.message}
                                    </div>}
                            </div>

                            <input
                                type="submit"
                                className="btn btn-primary btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProjectTask;