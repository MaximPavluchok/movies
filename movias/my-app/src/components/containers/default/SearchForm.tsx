import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../../http";
import { IMoviesGetItem } from "./types";
import "./DefaultHeader.css";

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await http.get<IMoviesGetItem[]>(`api/movies/search/name?query=${searchQuery}`);
        const firstMovie = response.data[0];
        console.log({firstMovie});
        if (firstMovie) {
          navigate(`movie/${firstMovie.id}`);
        }
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="search"
        className="search-movies"
        placeholder="Пошук фільма"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default SearchForm;
