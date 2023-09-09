import {useEffect, useState} from "react";
import MoviesItemList from "./MoviesItemList";
import http from "../../../../http";
import {IMoviesGetItem} from "./types-list";


const MoviesListPage = () => {
    const [movies, setMovies] = useState<IMoviesGetItem[]>();

    useEffect(() => {
        const result = http.get<IMoviesGetItem[]>(`api/movies/list`).then(resp => {
                // console.log("axios result", resp);
                setMovies(resp.data);
            }
        )
            .catch(bad => {
                    console.log("bad request", bad)
                }
            );
    }, []);

    return (
        <>
            {movies?.map((item) => (
                <MoviesItemList key={item.name} Movies={item}></MoviesItemList>
            ))}
        </>
    )
}
export default MoviesListPage;
