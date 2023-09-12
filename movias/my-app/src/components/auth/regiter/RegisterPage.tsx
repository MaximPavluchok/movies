import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";

import { IRegister, ILoginResult } from "./types";

import http from "../../../http";

import './auth-style.scss';

const RegisterPage: React.FC = () => {
  const navigator = useNavigate();

  const initValues: IRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null as File | null, 
  };

  const [error, setError] = useState<string>("");

  const createSchema = yup.object({
    email: yup.string().required("Enter email!").email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const onSubmitFormikData = async (values: IRegister) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      
      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      }

      const resp = await http.post<ILoginResult>("api/Auth/register", formData);

      if (resp.status === 200) {
        navigator("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: createSchema,
    onSubmit: onSubmitFormikData,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <img
        className="fone-auth"
        src="https://cdn.discordapp.com/attachments/965645827035000862/1103409895623102464/new_login_bg_strong_mask.png"
        alt="Background"
      />
      <div className="auth">
        <h1 id="text-vhid">Реєстрація</h1>
        <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="firstName" className="label-auth">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className={classNames("input-auth", {
                "is-invalid": errors.firstName && touched.firstName,
              })}
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            {errors.firstName && touched.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="label-auth">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className={classNames("input-auth", {
                "is-invalid": errors.lastName && touched.lastName,
              })}
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            {errors.lastName && touched.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="label-auth">
              Email
            </label>
            <input
              id="email"
              type="text"
              className={classNames("input-auth", {
                "is-invalid": errors.email && touched.email,
              })}
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="label-auth">
              ImageUrl
            </label>
            <input
              type="file" 
              className={classNames("image-auth", {
                "is-invalid": errors.image && touched.image,
              })}
              id="image"
              name="image"
              onChange={(event) => {
                handleChange(event);
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }
              }}
            />
            {errors.image && touched.image && (
              <div className="invalid-feedback">{errors.image}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="label-auth">
              Password
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="label-auth">
              Confirm Password
            </label>
            <input
              type="password"
              className={classNames("password-auth", {
                "is-invalid": errors.confirmPassword && touched.confirmPassword,
              })}
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="btn-auth">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
