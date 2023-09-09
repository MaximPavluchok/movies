import { FC, useEffect } from "react";
import {IMoviesGetItem} from "./types-list";
import { APP_ENV } from "../../../../env";
interface IMoviesListItem {
    Movies: IMoviesGetItem;
}

const MoviesItemList: FC<IMoviesListItem> = ({ Movies }) => {

    return (
        <>
            <div className="col mb-5">
                <div className="card h-100">

                    <img src={Movies.imagesUrl}></img>
                    <div className="card-body p-4">
                        <div className="text-center">

                            <h5 className="fw-bolder">{Movies.name}</h5>
                            <h6>Про що: {Movies.description}</h6>
                            Вік: {Movies.age}+
                        </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Кнопка</a></div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default MoviesItemList;
