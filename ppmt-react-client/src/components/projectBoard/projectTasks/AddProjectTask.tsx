import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {Controller, useForm} from "react-hook-form"
import DatePicker from "react-datepicker"
import classnames from "classnames"
import {useAddProjectTaskToBacklogMutation} from "../../../features/backlog/backlog-slice"
import {useFetchProjectQuery} from "../../../features/project/projectapi-slice"
import IProjectTask from "../../../models/ProjectTask"

const AddProjectTask = () => {

    const {id} = useParams()
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>()

    const {control, formState: {errors, isSubmitted}, handleSubmit, register, reset, watch} = useForm<IProjectTask>({
        defaultValues: {
            summary: "",
            acceptanceCriteria: "",
            status: "TO_DO",
            priority: 2
        }
    })
    const [addProjectTaskToBacklog] = useAddProjectTaskToBacklogMutation()
    const {data} = useFetchProjectQuery(id!)

    useEffect(() => {
        if(data) {
            reset({
                projectIdentifier: data.projectIdentifier
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const onSubmit = (data: IProjectTask) => {
        addProjectTaskToBacklog(data)
            .then(response => {
                navigate(`/projectBoard/${id}`)
            })
            .catch(error => {
                console.error({error})
                setErrorMessage(error)
            })
    }

    const dueDate = watch("dueDate")

    if (!data) {
        return null
    }

    return (
        <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${id}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Add Project Task</h4>
                        <p className="lead text-center">{data.projectName} - {data.projectIdentifier}</p>
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
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.summary
                                    })}
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
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.acceptanceCriteria
                                        })}
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
                                            value={value ? new Date(value).toLocaleDateString(): undefined}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            dateFormat="dd.MM.yyyy"
                                            minDate={new Date()}
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.dueDate
                                            })}
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
                                <select
                                    {...register("priority")}
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.priority
                                    })}
                                >
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
                                <select
                                    {...register("status")}
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.status
                                    })}
                                >
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

export default AddProjectTask;