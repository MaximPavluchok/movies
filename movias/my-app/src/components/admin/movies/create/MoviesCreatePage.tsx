import {useEffect, useState} from "react";
import {IUploadImageResult} from "../types";
import {IMoviesCreate} from "./types";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import http from "../../../../http";
import {useFormik} from "formik";
import MoviesInputString from "./MoviesInputString";
import CategoryParentSelect from "../../category/container/CategoryParentSelect";

const MoviesCreatePage = () => {

    const updateParentID = (id: number) => {
        setFieldValue('categoryId', id);
    };

    const initValues: IMoviesCreate = {
        name: '',
        description: '',
        imagesUrl: '',
        age: 0,
        categoryId: [],
        saved: [],
        
    }

    const createSchema = yup.object({
        name: yup.string().required("Вкажіть назву"),
        description: yup.string().required("Вкажіть опис"),
        imagesUrl: yup.string().required("Вкажіть Url плакату"),
        age: yup.number().min(0.00001, 'Вік повинен бути більше 0').required('Вкажіть мінімальний вік для перегляду'),
    });

    const navigate = useNavigate();
    const onSubmitFormikData = (values: IMoviesCreate) => {
        console.log(values);

        http.post('api/movies/addMovies', values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                console.log(values, resp);
                navigate("..");
            })
        navigate("..");
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });
    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

    return (
        <>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit} noValidate>
                <h1 className={"text-center"}>Добавлення фільму</h1>
                <MoviesInputString values={values} errors={errors} touched={touched} handleChange={handleChange}></MoviesInputString>
                <h6>Оберіть категорію фільму</h6>
                <CategoryParentSelect setProductId={updateParentID}></CategoryParentSelect>
                <button className="btn btn-primary" type="submit">Додати фільм</button>
            </form>
        </>
    );
}

export default MoviesCreatePage;
