import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import http from "../../../http";
import {AuthUserActionType, IAuthUser} from "../../auth/types";
import "./DefaultHeader.css";
import { IMoviesGetItem} from "./types";
import { useState } from "react";
import SearchForm from "./SearchForm";
const DefaultHeader = () => {
    const navigator = useNavigate();
    const {isAuth, user} = useSelector((store: any) => store.auth as IAuthUser);
    const dispatch = useDispatch();

    const logout = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("token");
        http.defaults.headers.common["Authorization"] = ``;
        dispatch({type: AuthUserActionType.LOGOUT_USER});
        navigator("/");
    };

    const isAdmin = user?.roles === "Admin";

    return (
        <>
            {isAuth ? (<header data-bs-theme="dark">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top" id="shapka">
                    <div className="container">
                        <Link className="navbar-brand" to="/home">
                            <div className="catalog-movies">
                                <h6 className="catalog-name">каталог</h6> 
                            </div>
                        </Link>
                        <Link className="navbar-brand" to="/home">
                            <div className="catalog-seved">
                                <h6 className="catalog-name">вибране</h6> 
                            </div>
                        </Link>
                        <div className="search-movies-div">
                            <SearchForm />
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                {isAdmin &&
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/admin"
                                        >
                                            Адмін панель
                                        </Link>
                                    </li>}
                            </ul>
                            
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/profile"
                                        >
                                            {user?.email}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/logout"
                                            onClick={logout}
                                        >
                                            Вихід
                                        </Link>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </nav>
            </header>) : ( <div></div>)}
        </>
    );
};
export default DefaultHeader;
