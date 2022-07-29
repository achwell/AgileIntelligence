import React, {useState} from "react"
import DatePicker from "react-datepicker"
import {Controller, useForm} from "react-hook-form"
import IProject from "../../models/Project"
import {useAddProjectMutation} from "../../features/project/projectapi-slice"
import "react-datepicker/dist/react-datepicker.css"
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import classnames from "classnames";
import {useNavigate} from "react-router-dom";

const AddProject = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>()

    const {control, formState: {errors, isSubmitted}, handleSubmit, register, watch} = useForm<IProject>({
        defaultValues: {
            projectName: "",
            projectIdentifier: "",
            description: ""
        }
    })
    const [addProject, {isLoading}] = useAddProjectMutation()

    const onSubmit = (data: IProject) => {
        addProject(data)
            .then((response: { data: IProject } | { error: FetchBaseQueryError | SerializedError }) => {
                console.log({response})
                navigate("/dashboard")
            })
            .catch(error => {
                console.error({error})
                setErrorMessage(error)
            })
    }

    const startDate = watch("start_date")
    const endDate = watch("end_date")

    return (
        <div>
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr/>
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
                                            "is-invalid": errors.projectName
                                        })}
                                        placeholder="Project Name"
                                        required
                                        {...register("projectName", {
                                            required: "Project Name is required.",
                                            maxLength: 255
                                        })}
                                    />
                                    {errors.projectName && errors.projectName.message &&
                                        <div className="invalid-feedback">
                                            {errors.projectName.message}
                                        </div>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectIdentifier
                                        })}
                                        placeholder="Unique Project ID"
                                        maxLength={5}
                                        minLength={4}
                                        required
                                        {...register("projectIdentifier", {
                                            required: "Project ID is required.",
                                            maxLength: 5,
                                            minLength: 4
                                        })}
                                    />
                                    {errors.projectIdentifier && errors.projectIdentifier.message &&
                                        <div className="invalid-feedback">
                                            {errors.projectIdentifier.message}
                                        </div>}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Project Description"
                                        {...register("description")}
                                    />
                                    {errors.description && errors.description.message &&
                                        <div className="invalid-feedback">
                                            {errors.description.message}
                                        </div>}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        name="start_date"
                                        render={({field: {name, value, onChange, onBlur}}) =>
                                            <DatePicker
                                                name={name}
                                                value={value ? new Date(value).toLocaleDateString(): undefined}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                dateFormat="dd.MM.yyyy"
                                                minDate={new Date()}
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.start_date
                                                })}
                                                selected={startDate ? new Date(startDate) : undefined}
                                                showTimeSelect={false}
                                                todayButton="I dag"
                                                dropdownMode="select"
                                                isClearable
                                                placeholderText="Click to select time"
                                                shouldCloseOnSelect
                                            />}
                                    />
                                    {errors.start_date && errors.start_date.message &&
                                        <div className="invalid-feedback">
                                            {errors.start_date.message}
                                        </div>}
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <Controller
                                        control={control}
                                        name="end_date"
                                        render={({field: {name, value, onChange, onBlur}}) =>
                                            <DatePicker
                                                name={name}
                                                value={value ? new Date(value).toLocaleDateString(): undefined}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                dateFormat="dd.MM.yyyy"
                                                minDate={new Date()}
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.end_date
                                                })}
                                                selected={endDate ? new Date(endDate) : undefined}
                                                showTimeSelect={false}
                                                todayButton="I dag"
                                                dropdownMode="select"
                                                isClearable
                                                placeholderText="Click to select time"
                                                shouldCloseOnSelect
                                            />}
                                    />
                                    {errors.start_date && errors.start_date.message &&
                                        <div className="invalid-feedback">
                                            {errors.start_date.message}
                                        </div>}
                                </div>

                                <input
                                    disabled={isLoading}
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject