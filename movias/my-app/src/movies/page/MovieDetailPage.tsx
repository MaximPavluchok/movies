import { FC, useEffect, useState } from "react";
import { IMovieGetItem, ISaved } from "./types";
import { useParams } from 'react-router-dom';
import './style-movie-page.scss';
import http from '../../http';

interface MovieDetailsProps {
  movieId: string;
}

const MovieDetailsPage: FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<IMovieGetItem | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (movieId) {
      http.get<IMovieGetItem>(`api/movies/get/${movieId}`)
        .then((resp) => {
          setMovie(resp.data);
        })
        .catch((error) => {
          console.error('Error loading movie:', error);
        });
    }
  }, [movieId]);

  const handleSaveMovie = async () => {
    try {
      await fetch(`/api/movies/save/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsSaved(true);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-">
      <img className="img-plakat-" src={movie.imagesUrl} alt={movie.name}></img>
      <div className="text-">
        <h5 className="movie-name-">{movie.name}</h5>
        <h6 className="originalName-">{movie.originalName}</h6>
        <div className="categories-div-">
          <h6 className="categories-">
            {movie.categories.map((category, index) => (
              <span key={category.id}>
                {category.name}
                {index < movie.categories.length - 1 && " | "}
              </span>
            ))}
          </h6>
        </div>
        <div className="ratings-div-"><h5 className="ratings-">{movie.ratings}</h5></div>
        <div className="date_Release-div-"><h6 className="date_Release-">{movie.date_Release}</h6></div>
          <button className="saved-div" onClick={handleSaveMovie}>
            <h6 className="saved-text">{isSaved ? "Сохранено" : "Сохранить"}</h6>
          </button>
        <div className="age-div"><h6 className="Age-">{movie.age}+</h6></div>
      </div>
      <div className="description-div-"><h6 className="movie-description-">{movie.description}</h6></div>
      <div className="movie-play">
        <div className="load"></div>
        <div className="line1-"></div>
        <div className="line1-1"></div>
        <div className="line2-"></div>
        <div className="line3-"> <div className="pause"></div> </div>
        <div className="line4-"> <div className="next"></div> <div className="line4-1"></div></div>
        <div className="line5-"> <div className="back"></div> <div className="line5-1"></div> </div>
      </div>
      <div className="line-1-"></div>
    </div>
  );
};

export default MovieDetailsPage;
