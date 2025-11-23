import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function AppRoute() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                />
            ))}
        </Routes>
    );
}
export default AppRoute;
