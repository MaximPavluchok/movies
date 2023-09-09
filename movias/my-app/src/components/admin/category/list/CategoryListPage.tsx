import {useEffect, useState} from "react";
import {APP_ENV} from "../../../../env";
import http from "../../../../http";
import {ICategoryItem} from "./types";
import {Link} from "react-router-dom";
import ModalDelete from "../../../common/ModalDelete";

const CategoryListPage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http.get("api/Categories/list")
            .then(resp => {
                const data = resp.data;
                setList(data);
            });
    }, []);

    const onDelete = async (id: number) => {
        try {
            await http.delete(`api/categories/delete/${id}`);
            setList(list.filter(x => x.id !== id));
        } catch {
            console.log("Delete bad request");
        }
    }

    const mapList = list.map(category => (
        <tr key={category.id}>
            <td>{category.name}</td>
        </tr>
    ));

    return (
        <>
            <h1 className="text-center">Список категорій</h1>
            <Link to={"create"} className={"btn btn-success"}>Додати</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Назва</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {mapList}
                </tbody>
            </table>
        </>
    );
};
export default CategoryListPage;
