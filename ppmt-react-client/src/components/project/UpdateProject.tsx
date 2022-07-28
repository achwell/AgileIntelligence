import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {
    useUpdateProjectMutation,
    useFetchProjectQuery
} from "../../features/project/projectapi-slice"
import Project from "../../models/Project";
import DatePicker from "react-datepicker";
import {useNavigate, useParams} from "react-router-dom";

const UpdateProject = () => {

    const [errorMessage, setErrorMessage] = useState<string>()

    const {control, formState: {errors, isSubmitted}, handleSubmit, register, reset, watch} = useForm<Project>()

    const [updateProject] = useUpdateProjectMutation()

    const {id} = useParams()
    const navigate = useNavigate();

    const {data, error} = useFetchProjectQuery(id + "")

    useEffect(() => {
        reset(data as Project)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if(error) {
            navigate("/dashboard")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const onSubmit = (data: Project) => {
        updateProject(data)
            .then((response: { data: Project } | { error: FetchBaseQueryError | SerializedError }) => {
                console.log({response})
            })
            .catch(error => {
                console.error({error})
                setErrorMessage(error)
            })
    }

    const startDate = watch("start_date")
    const endDate = watch("end_date")

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Update Project form</h5>
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
                                    className="form-control form-control-lg"
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
                                    className="form-control form-control-lg"
                                    placeholder="Unique Project ID"
                                    required
                                    disabled
                                    {...register("projectIdentifier", {
                                        required: "Project ID is required.",
                                        maxLength: 255
                                    })}
                                />
                                {errors.projectIdentifier && errors.projectIdentifier.message &&
                                    <div className="invalid-feedback">
                                        {errors.projectIdentifier.message}
                                    </div>}
                            </div>
                            <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
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
                                            className="form-control form-control-lg"
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
                                            className="form-control form-control-lg"
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
export default UpdateProject