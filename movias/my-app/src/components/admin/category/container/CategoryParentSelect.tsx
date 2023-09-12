import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategoryItem } from "../list/types";
import http from "../../../../http";
import { APP_ENV } from "../../../../env";

interface IProductParentSelect {
    setProductId: (id:number) => void;
}

const CategoryParentSelect: FC<IProductParentSelect> = ({setProductId}) => {
    const [category, setCategory] = useState<ICategoryItem[]>();
    const [search, setSearch] = useState("");
    const [textSelectCategory, settextSelectCategory] = useState('Вибрати батьківську категорію');

    useEffect(() => {
        const result = http.get<ICategoryItem[]>(`api/Categories/list${search}`).then(resp => {
                setCategory(resp.data);
            }
        )
            .catch(bad => {
                    console.log("bad request", bad)
                }
            );

    }, []);
    const HandleClickSelect = (name: string, id: number) => {
        console.log(name);
        settextSelectCategory("Вибрано батьківську категорію: " + name);
        setProductId(id);
        setSearch("");
    }
    return (
        <>
            <div className="modal fade" id="ModalSelect" aria-labelledby="ModalSelectLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex justify-content-center vertical-align-middle mb-2 mt-2">
                                <button onClick={() => HandleClickSelect("", 0)} className='justify-content-end float-end btn btn-outline-dark'>Вибрати</button>
                            </div>
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-3'>
                <button type='button' data-bs-toggle="modal" data-bs-target="#ModalSelect" className='btn btn-outline-info'>{textSelectCategory}</button>
            </div>
        </>)
}
export default CategoryParentSelect;
