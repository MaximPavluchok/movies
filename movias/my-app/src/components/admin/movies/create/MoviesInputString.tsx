import classNames from "classnames";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { FC } from "react";
import * as yup from "yup";
import { IMoviesCreate } from "./types";

interface IMoviesInputFormik {
    values: IMoviesCreate;
    errors: FormikErrors<IMoviesCreate>;
    touched: FormikTouched<IMoviesCreate>;
    handleChange: (e: React.ChangeEvent<any>) => void;
}


const MoviesInputString: FC<IMoviesInputFormik> = ({ values, errors, handleChange, touched }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="name">Назва фільму:</label>
                <input
                    className={classNames("form-control", { "is-invalid": errors.name && touched.name })}
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && touched.name && <div className="invalid-feedback">
                    {errors.name}
                </div>}

            </div>
            <div className="mb-3">
                <label htmlFor="description">Опис фільму:</label>
                <textarea
                    id="description"
                    name="description"
                    className={classNames("form-control", { "is-invalid": errors.description && touched.description })}
                    value={values.description}
                    onChange={handleChange}
                    required
                />
                {errors.description && touched.description && <div className="invalid-feedback">
                    {errors.description}
                </div>}
            </div>
            <div className="mb-3">
                <label htmlFor="age">Вік:</label>
                <input
                    type='number'
                    id="age"
                    name="age"
                    className={classNames("form-control", { "is-invalid": errors.age && touched.age })}
                    value={values.age}
                    onChange={handleChange}
                    required
                />
                {errors.age && touched.age && <div className="invalid-feedback">
                    {errors.age}
                </div>}
            </div>

        </>
    )
}
export default MoviesInputString;
