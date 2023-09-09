import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategoryItem } from "../list/types";
import http from "../../../../http";
import { APP_ENV } from "../../../../env";

interface IProductParentSelect {
    setProductId: (id:number) => void;
}

const CategoryParentSelect: FC<IProductParentSelect> = ({setProductId}) => {
    // Список категорій
    const [category, setCategory] = useState<ICategoryItem[]>();
    // id батьківської категорії
    const [search, setSearch] = useState("");
    const [textSelectCategory, settextSelectCategory] = useState('Вибрати батьківську категорію');

    // запит на апі
    useEffect(() => {
        // Якщо search пустий витягує всі категорії, інакше витяг категорій по батьківському id
        const result = http.get<ICategoryItem[]>(`api/Categories/list${search}`).then(resp => {
                // console.log("axios result", resp);
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
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalSelectLabel">Вибір батьківської категорії</h1>
                            <button type="button" className="btn-close" onClick={() => setSearch("")} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center vertical-align-middle mb-2 mt-2">
                                <img src={"https://e7.pngegg.com/pngimages/29/173/png-clipart-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-thumbnail.png"} className="float-start imageCategories" alt="..." />
                                <Link className="d-flex page-link vertical-align-middle h-100 w-100 d-inline" to={""}>
                                    <p className='m-0'>- немає батьківського</p>

                                </Link>
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
