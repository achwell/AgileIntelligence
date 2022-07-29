import React, {useState} from "react";
import {useForm} from "react-hook-form";
import IUser from "../../models/User"
import classnames from "classnames";
import {useCreateUserMutation} from "../../features/user/user-slice";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [errorMessage, setErrorMessage] = useState<string>()

    const {formState: {errors, isSubmitted}, handleSubmit, register, watch} = useForm<IUser>({
        defaultValues: {
            id: 0,
            username: "",
            fullName: "",
            password: "",
            confirmPassword: ""
        }
    })

    const navigate = useNavigate();

    const [createUser] = useCreateUserMutation()

    const isValidEmail = (email: string) =>
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        )

    const onSubmit = (data: IUser) => {
        createUser(data)
            .then(response => {
                navigate("/login")
            })
            .catch(error => {
                console.error({error})
                setErrorMessage(error)
            })
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
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
                                        "is-invalid": errors.fullName
                                    })}
                                    placeholder="Name"
                                    required
                                    {...register("fullName", {
                                        required: "Name is required.",
                                        maxLength: 255
                                    })}
                                />
                                {errors.fullName && errors.fullName.message &&
                                    <div className="invalid-feedback">
                                        {errors.fullName.message}
                                    </div>}
                            </div>
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
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.confirmPassword
                                    })}
                                    placeholder="Confirm Password"
                                    required
                                    {...register("confirmPassword",  {
                                        required: "Confirm Password is required.",
                                        minLength: 6,
                                        maxLength: 255,
                                        validate: (value) => watch("password") === value || "Passwords does not match!"
                                    })}
                                />
                                {errors.confirmPassword && errors.confirmPassword.message &&
                                    <div className="invalid-feedback">
                                        {errors.confirmPassword.message}
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
export default Register