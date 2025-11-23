import React, { useEffect, useState } from "react";
import "./Categories.css";
import { Category } from "../../components/Cards/Category";
import supabase from "../../utils/supabase";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(false);
        try {
            const { data, error } = await supabase.from("categories").select();

            if (error) throw error;
            setCategories(data);
        } catch (error) {
            console.error("Ошибка загрузки категории:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="categories">
            {categories.map((c) => (
                <Category
                    key={c.id}
                    id={c.id}
                    name_ru={c.name_ru}
                    icon={c.icon}
                    slug={c.slug}
                />
            ))}
        </div>
    );
};
