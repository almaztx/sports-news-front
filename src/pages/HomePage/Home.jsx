import React, { useEffect, useState } from "react";
import "./Home.css";
import supabase from "../../utils/supabase";
import { News } from "../../components/Cards/News";

export const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("news")
                .select(
                    `id, title, created_at, source, categories!category_id (name_ru, slug, icon)`
                )
                .order("created_at", { ascending: false });

            if (error) throw error;
            setNews(data);
        } catch (error) {
            console.error("Ошибка загрузки новостей:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {news.map((n) => (
                <News
                    key={n.id}
                    id={n.id}
                    title={n.title}
                    date={n.created_at}
                    category={n.categories?.name_ru}
                    categorySlug={n.categories.slug}
                />
            ))}
        </>
    );
};
