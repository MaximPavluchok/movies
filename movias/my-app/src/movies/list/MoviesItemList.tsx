import { FC, useEffect, useState } from "react";
import { IMoviesGetItem} from "./types";
import { APP_ENV } from "../../env";
import './style.scss';
import { Link } from "react-router-dom";
interface IMoviesListItem {
    Movies: IMoviesGetItem;
}

const MoviesItemList: FC<IMoviesListItem> = ({ Movies }) => {

    return (
    <>
        <Link to={`/movie/${Movies.id}`} className='movie-link'>
            <div className="block-movie-">
                <img className="img-plakat" src={Movies.imagesUrl} alt={Movies.name}></img>
                <div className="text">
                    <h5 className="movie-name">{Movies.name}</h5>
                    <h6 className="originalName">{Movies.originalName}</h6>
                    <div className="categories-div">
                        <h6 className="categories">
                            {Movies.categories.map((category, index) => (
                                <span key={category.id}>
                                    {category.name}
                                    {index < Movies.categories.length - 1 && " | "}
                                </span>
                            ))}
                        </h6>
                    </div>
                    <div className="ratings-div"><h5 className="ratings">{Movies.ratings}</h5></div>
                    <div className="date_Release-div"><h6 className="date_Release">{Movies.date_Release.slice(0, 4)}</h6></div>
                    <div className="description-div"><h6 className="movie-description">{Movies.description}</h6></div>
                </div>
                <div className="line-1"></div>
            </div>
        </Link>
    </>
    );
};

export default MoviesItemList;
