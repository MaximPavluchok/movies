import "./App.css";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import CategoryListPage from "./components/admin/category/list/CategoryListPage";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/regiter/RegisterPage";
import CategoryEditPage from "./components/admin/category/edit/CategoryEditPage";
import AdminLayout from "./components/admin/container/AdminLayout";
import AdminHomePage from "./components/admin/home/AdminHomePage";
import HomePage from "./components/home/HomePage";
import StartPage from "./components/pages/StartPage";
import ForbiddenPage from "./components/pages/ForbiddenPage";
import MoviesListPage from "./components/admin/movies/list/MoviesListPage";
import MoviesCreatePage from "./components/admin/movies/create/MoviesCreatePage";
import MovieDetailPage from "./movies/page/MovieDetailPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<StartPage/>}/>
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="/movie/:movieId" element={<MovieDetailPage/>}/>
                </Route>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path={"/pages"}>
                    <Route path={"403"} element={<ForbiddenPage/>} />
                </Route>
                <Route path={"/admin"} element={<AdminLayout/>}>
                    <Route index element={<AdminHomePage/>}/>
                    <Route path={"categories"}>
                        <Route index element={<CategoryListPage/>}/>
                        <Route path="create" element={<CategoryCreatePage/>}/>
                        <Route path="edit/:id" element={<CategoryEditPage/>}/>
                    </Route>
                    <Route path={"movies"}>
                        <Route index element={<MoviesListPage/>}/>
                        <Route path="create" element={<MoviesCreatePage/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
