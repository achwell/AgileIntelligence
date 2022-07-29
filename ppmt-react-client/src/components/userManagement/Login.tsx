import React, {useState} from "react"
import {FetchBaseQueryError} from "@reduxjs/toolkit/query"
import {SerializedError} from "@reduxjs/toolkit"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import classnames from "classnames"
import {useLoginMutation} from "../../features/user/user-slice"
import IUser from "../../models/User"

const Login = () => {

    const [errorMessage, setErrorMessage] = useState<string>()

    const {formState: {errors, isSubmitted}, handleSubmit, register} = useForm<IUser>({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const navigate = useNavigate()

    const [login] = useLoginMutation()

    const isValidEmail = (email: string) =>
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        )

    const onSubmit = (data: IUser) => {
        login(data)
            .then(response => {
                if("data" in response) {
                    const {data:{success, token}} = response
                    if(success) {
                        navigate("/dashboard")
                    }
                } else if ("error" in response) {
                    localStorage.removeItem("token")
                    const {error} = response
                    console.error({error})
                    const e1 = (error as FetchBaseQueryError)?.data
                    const e2 = (error as SerializedError)?.message
                    if(e1) {
                        setErrorMessage(JSON.stringify(e1))
                    }
                    if(e2) {
                        setErrorMessage(e2 as string)
                    }
                }
            })
            .catch(error => {
                console.error({error})
                setErrorMessage(error)
            })
    }
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate
                              className={isSubmitted ? 'was-validated' : ''}>
                            {errorMessage &&
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            }
                            <div className="form-group">
                                <input
                                    type="email"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.username
                                    })}
                                    placeholder="Email Address"
                                    required
                                    {...register("username", {
                                        required: "Email Address is required.",
                                        validate: isValidEmail,
                                        maxLength: 255
                                    })}
                                />
                                {errors.username && errors.username.message &&
                                    <div className="invalid-feedback">
                                        {errors.username.message}
                                    </div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.password
                                    })}
                                    placeholder="Password"
                                    required
                                    {...register("password", {
                                        required: "Password is required.",
                                        minLength: 6,
                                        maxLength: 255
                                    })}
                                />
                                {errors.password && errors.password.message &&
                                    <div className="invalid-feedback">
                                        {errors.password.message}
                                    </div>}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login