import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { ICategoryEdit } from "./types";
import * as yup from "yup";
import classNames from "classnames";
import {useNavigate, useParams} from "react-router-dom";
import http from "../../../../http";
import { ICategoryItem } from "../list/types";
import {ICategoryCreate} from "../create/types";

const CategoryEditPage = () => {

    const navigator = useNavigate();

    const {id} = useParams();

    const initValues: ICategoryEdit = {
        id: 0,
        name: "",
    };

    const createSchema = yup.object({
        name: yup.string().required("Вкажіть назву"),
    });

    const onSubmitFormikData = (values: ICategoryEdit) => {
        console.log("Formik send data", values);
        http
            .put(`api/categories/edit`, values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                navigator("../");
            });
    };

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData,
    });

    const { setFieldValue,
        values,
        errors,
        touched,
        handleSubmit,
        handleChange } = formik;

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const file = e.target.files[0];
            formik.setFieldValue(e.target.name, file);
        }
    };

    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http.get("api/Categories/list").then((resp) => {
            const data = resp.data;
            setList(data);
        });
    }, []);

    useEffect(() => {
       http.get<ICategoryItem>(`api/categories/get/${id}`)
           .then(resp => {
               const {data} = resp;
                setFieldValue("id", data.id);
                setFieldValue("name", data.name);
           });
    },[id]);


    return (
      <>
          <h1 className="text-center">Зміна категорії</h1>
          <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                      Назва
                  </label>
                  <input
                      type="text"
                      className={classNames("form-control", {
                          "is-invalid": errors.name && touched.name,
                      })}
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                  )}
              </div>




              <button type="submit" className="btn btn-primary">
                  Зберегти зміни
              </button>
          </form>
      </>
    );
}

export default CategoryEditPage;
