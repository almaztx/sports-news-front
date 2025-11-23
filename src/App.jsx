import "./App.css";
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs";
import { Header } from "./components/Header/Header";
import AppRoute from "./utils/AppRoute";

function App() {
    return (
        <>
            <Header />
            <Breadcrumbs />
            <main>
                <AppRoute />
            </main>
        </>
    );
}

export default App;
