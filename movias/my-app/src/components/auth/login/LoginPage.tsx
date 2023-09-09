import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import classNames from "classnames";
import {ILogin, ILoginResult} from "./types";
import http from "../../../http";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "../types";
import {useDispatch} from "react-redux";
import './auth-style.scss';
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const initValues: ILogin = {
        email: "",
        password: "",
    };

    const [error, setError]=useState<string>("");

    const createSchema = yup.object({
        email: yup.string().required("Enter email!"),
        password: yup
            .string()
            .required("password is required")
            .min(6, "password must be at least 6 characters"),
    });

    const onSubmitFormikData = async (values: ILogin) => {
        try {
            const resp = await http
                .post<ILoginResult>("api/Auth/login", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            const {token} = resp.data;
            const user = jwtDecode(token) as IUser;
            //console.log("User info", user);
            localStorage.token = token;
            http.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    image: user.image,
                    roles: user.roles
                },
            });
            navigator("/home");

        } catch {
          setError("Дані вказано не вірно!");
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData,
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    return (
        <>
            <img className="fone-auth" src="https://cdn.discordapp.com/attachments/965645827035000862/1103409895623102464/new_login_bg_strong_mask.png"></img>
            <div className="auth">
            <h1 id="text-vhid">Вхід</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
              {   error &&
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
              }
                <div className="mb-3">
                    <label htmlFor="email" className="label-auth">
                        email
                    </label>
                    <div className="form__group field">
                    <input itemID="input-auth1"
                        type="text"
                        className={classNames("input-auth", {
                            "is-invalid": errors.email && touched.email,
                        })}
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    /></div>
                    {errors.email && touched.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="label-auth" >
                        password
                    </label>
                    <input
                        type="password"
                        className={classNames("password-auth", {
                            "is-invalid": errors.password && touched.password,
                        })}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>

                <button type="submit" className="btn-auth">
                    Вхід
                </button>
                <a href="register">Зареєструватися</a>
            </form>
            </div>
        </>
    );
};
export default LoginPage;
