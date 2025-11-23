import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../../utils/supabase";
import { News } from "../../components/Cards/News";

export const CategoryList = () => {
    const { slug } = useParams();
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) fetchCategoryNews();
    }, [slug]);

    const fetchCategoryNews = async () => {
        setLoading(true);
        try {
            // 1. Ищем категорию по slug
            const { data: catData, error: catError } = await supabase
                .from("categories")
                .select("id, name_ru, icon")
                .eq("slug", slug)
                .single();

            if (catError || !catData) {
                console.error("Категория не найдена:", catError);
                setCategory(null);
                setNews([]);
                setLoading(false);
                return;
            }

            setCategory(catData);

            // 2. Загружаем новости только этой категории
            const { data, error } = await supabase
                .from("news")
                .select(
                    `
          id,
          title,
          created_at,
          source,
          categories!category_id (
            name_ru,
            slug,
            icon
          )
        `
                )
                .eq("category_id", catData.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            setNews(data || []);
        } catch (err) {
            console.error("Ошибка загрузки новостей категории:", err);
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    if (!loading && !category) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-red-500 mb-4">
                    Категория не найдена
                </h2>
                <Link to="/" className="text-blue-600 hover:underline text-lg">
                    Вернуться на главную
                </Link>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Загрузка новостей...
                </div>
            ) : news.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-xl">
                    В этой категории пока нет новостей
                </div>
            ) : (
                <div className="space-y-6">
                    {news.map((n) => (
                        <News
                            key={n.id}
                            id={n.id}
                            title={n.title}
                            date={n.created_at}
                            category={n.categories?.name_ru}
                            categorySlug={n.categories?.slug}
                            icon={n.categories?.icon}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
