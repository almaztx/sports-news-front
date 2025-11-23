import React, { useEffect, useState } from "react";
import "./Detail.css";
import supabase from "../../utils/supabase";
import { NewsDetail } from "../../components/Cards/NewsDetail";
import { useParams } from "react-router-dom";

export const Detail = () => {
    const { slug, id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select(
                        `
            id,
            title,
            content,
            created_at,
            image_url,
            source,
            categories!category_id (
              slug,
              name_ru
            )
          `
                    )
                    .eq("id", id)
                    .single();

                if (error) throw error;

                if (data.categories.slug !== slug) {
                    setNews(null);
                } else {
                    setNews(data);
                }
            } catch (error) {
                console.error("Ошибка загрузки новости:", error);
                setNews(null);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [slug, id]);

    if (loading) return <div className="text-center py-20">Загрузка...</div>;
    if (!news)
        return (
            <div className="text-center py-20 text-red-600">
                Новость не найдена
            </div>
        );
    return (
        <>
            <NewsDetail
                key={news.id}
                id={news.id}
                title={news.title}
                date={news.created_at}
                content={news.content}
                image_url={news.image_url}
                source={news.source}
                category={news.categories.name_ru}
                categorySlug={news.categories.slug}
            />
        </>
    );
};
