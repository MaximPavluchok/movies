import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
    return (
        <main>
            <DefaultHeader />
            <div className="container">
                <Outlet />
            </div>
        </main>
    );
}
export default DefaultLayout;