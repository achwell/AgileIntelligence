import React, {FC} from "react"
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks"
import {logout} from "../../features/auth/auth-slice"
import IUser from "../../models/User";

interface Props {
    currentUser?: IUser
}

const Header:FC<Props> = ({currentUser}) => {

    const dispatch = useAppDispatch()
    const isLoggedIn = !!currentUser

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Personal Project Management Tool
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    {isLoggedIn && <>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {currentUser && <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fas fa-user-circle mr-1" />
                                    {currentUser.fullName}
                                </Link>
                            </li>}
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/logout"
                                    onClick={() => dispatch(logout())}
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </>}

                    {!isLoggedIn && <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Sign Up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>}
                </div>
            </div>
        </nav>
    )
}

export default Header