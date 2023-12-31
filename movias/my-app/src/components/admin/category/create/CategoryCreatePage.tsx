import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { ICategoryCreate } from "./types";
import * as yup from "yup";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import http from "../../../../http";
import { ICategoryItem } from "../list/types";

const CategoryCreatePage = () => {
  const navigator = useNavigate();

  const initValues: ICategoryCreate = {
    name: "",
  };

  const createSchema = yup.object({
    name: yup.string().required("Вкажіть назву"),
  });

  const onSubmitFormikData = (values: ICategoryCreate) => {
    console.log("Formik send data", values);
    http
      .post("api/categories/Create", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        navigator("..");
      });
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: createSchema,
    onSubmit: onSubmitFormikData,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

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

  return (
    <>
      <h1 className="text-center">Додати категорію</h1>
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
          Додати
        </button>
      </form>
    </>
  );
};
export default CategoryCreatePage;
