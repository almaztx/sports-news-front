import { useEffect, useState } from "react";
import "./Breadcrumbs.css";
import { useLocation, useNavigate } from "react-router-dom";
import BackFrame from "../../assets/Frame.svg";
import supabase from "../../utils/supabase";

export const Breadcrumbs = () => {
    const location = useLocation();
    const [categoryName, setCategoryName] = useState("");
    const navigate = useNavigate();

    const pathParts = location.pathname.split("/").filter(Boolean);
    const slug = pathParts[0];

    useEffect(() => {
        if (slug && pathParts.length === 1 && slug !== "categories") {
            const fetchName = async () => {
                const { data } = await supabase
                    .from("categories")
                    .select("name_ru")
                    .eq("slug", slug)
                    .single();

                setCategoryName(data?.name_ru || slug);
            };
            fetchName();
        }
    }, [location.pathname]);

    if (location.pathname === "/") {
        return <div className="breadcrumbs all-news">Все новости</div>;
    }
    if (location.pathname === "/categories") {
        return <div className="breadcrumbs ctgs">Категории</div>;
    }

    if (pathParts.length === 1 && slug) {
        return (
            <div className="breadcrumbs single-ctgr">
                {categoryName || "Загрузка..."}
            </div>
        );
    }

    if (pathParts.length === 2 && !isNaN(pathParts[1])) {
        return (
            <div className="breadcrumbs article-detail">
                <button className="back-frame" onClick={() => navigate(-1)}>
                    <img src={BackFrame} alt="назад" />
                    <span>Назад</span>
                </button>
            </div>
        );
    }
    return null;
};
