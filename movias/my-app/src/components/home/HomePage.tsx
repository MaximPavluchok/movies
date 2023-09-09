import React, { useEffect, useState } from 'react';
import './style-home-page.scss';
import http from '../../http';
import { IMoviesGetItem, ICategory } from './types';
import MoviesItemList from '../../movies/list/MoviesItemList';
import MovieDetailsPage from '../../movies/page/MovieDetailPage';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [movies, setMovies] = useState<IMoviesGetItem[] | null>(null);
  const [filterTextHeight, setFilterTextHeight] = useState<number>(0);
  const [categoryTextHeight, setCategoryTextHeight] = useState<number>(0);
  const [categoryBoxHeight, setCategoryBoxHeight] = useState<number>(0);
  const [categoryDivHeight, setCategoryDivHeight] = useState<number>(0);
  const [text1, setText1] = useState<number>(0);
  const [text2, setText2] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);
  const [sorting, setSorting] = useState<number>(0);
  const [sort, setSort] = useState<number>(0);
  const [sortB, setSortB] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('ratings');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get<IMoviesGetItem[]>(`api/movies/list`);
        setMovies(response.data);

        const categoriesResponse = await http.get<ICategory[]>(`api/categories/list`);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleFilterTextHeight = () => {
    setFilterTextHeight((prevHeight) => (prevHeight === 0 ? 1160 : 0));
    setCategoryBoxHeight((prevHeight) => (prevHeight === 0 ? 20 : 0));
    setCategoryTextHeight((prevHeight) => (prevHeight === 0 ? 17 : 0));
    setText1((prevHeight) => (prevHeight === 0 ? 20 : 0));
    setText2((prevHeight) => (prevHeight === 0 ? 14 : 0));
    setPeriod((prevHeight) => (prevHeight === 0 ? 400 : 0));
    setSorting((prevHeight) => (prevHeight === 0 ? 400 : 0));
    setSort((prevHeight) => (prevHeight === 0 ? 50 : 0));
    setSortB((prevHeight) => (prevHeight === 0 ? 1 : 0));

    setCategoryDivHeight((prevHeight) => (prevHeight === 0 ? categories.length * 52 : 0));
  };

  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
    }
  };

  const handleYearChange = (year: number) => {
    if (selectedYears.includes(year)) {
      setSelectedYears((prevYears) =>
        prevYears.filter((y) => y !== year)
      );
    } else {
      setSelectedYears((prevYears) => [...prevYears, year]);
    }
  };

  const filteredMovies = movies?.filter((movie) =>
    selectedCategories.every((categoryId) =>
      movie.categories.some((category) => category.id === categoryId)
    ) &&
    (selectedYears.length === 0 || selectedYears.includes(parseInt(movie.date_Release)))
  ) || [];

  const sortedMovies = [...filteredMovies];

  if (sortBy === 'ratings') {
    sortedMovies.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));
  } else if (sortBy === 'date') {
    sortedMovies.sort((a, b) => new Date(b.date_Release).getTime() - new Date(a.date_Release).getTime());
  }

  return (
    <>
      <div className="filter" onClick={toggleFilterTextHeight}>
        <h2 className="filter-text">фільтри</h2>
      </div>
      <div className="filter-menu" style={{ height: `${filterTextHeight}px` }}>
        <div className="kategorie" style={{ height: `${categoryDivHeight}px` }}>
          <h1 className='text-1' style={{ fontSize: `${text1}px` }}>Жанри</h1>
          <h2 className='text-2' style={{ fontSize: `${text2}px` }}>Ви можете відфільтрувати список фільмів по вказаним жанрам</h2>
          {categories.map((category) => (
            <div key={category.id}>
              <input
                style={{ width: `${categoryBoxHeight}px` }}
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="checkboxs"
              />
              <label className="name-category" style={{ fontSize: `${categoryTextHeight}px` }}>{category.name}</label>
            </div>
          ))}
        </div>
        <div className="period" style={{ height: `${period}px`, overflow: 'auto', overflowX: 'hidden' }}>
          <h1 className='text-1' style={{ fontSize: `${text1}px` }}>Період</h1>
          <h2 className='text-2' style={{ fontSize: `${text2}px` }}>Ви можете відфільтрувати список фільмів по рокам випуску</h2>
          <div className="years-checkboxes">
            {Array.from({ length: 2023 - 1997 + 1 }, (_, i) => 2023 - i).map((year) => (
              <div key={year}>
                <input
                  style={{ width: `${categoryBoxHeight}px`, margin: "10px", marginLeft: "15px" }}
                  type="checkbox"
                  value={year}
                  checked={selectedYears.includes(year)}
                  onChange={() => handleYearChange(year)}
                  className={`checkboxs${year}`}
                />
                <label className={`name-period${year}`} style={{ fontSize: `${categoryTextHeight}px`, position: "relative", left: "10px", top: "-18px", color: "white" }}>{year}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="sorting" style={{ height: `${sorting}px`}}>
          <h1 className='text-1' style={{ fontSize: `${text1}px` }}>Сортуванння</h1>
          <h2 className='text-2' style={{ fontSize: `${text2}px` }}>Ви можете вісортувати список фільмів по рейтингу або даті випуску</h2>
          <select name='sort' className='sort' style={{ height: `${sort}px`, border: `${sortB}`  }} onChange={(e) => setSortBy(e.target.value)}>
            <option value="ratings" selected={sortBy === 'ratings'}>По рейтингу</option>
            <option value="date" selected={sortBy === 'date'}>По даті випуску</option>
          </select>
        </div>
      </div>
      <div className="movies-list-page">
        {sortedMovies.map((item) => (
          <div className="movies-list" key={item.id}>
            <Link to={`/movies/${item.id}`}>
              <MoviesItemList Movies={item} />
            </Link>
          </div>
        ))}
        <Routes>
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </>
  );
};

export default HomePage;
