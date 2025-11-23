import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuBtn from "../../assets/menu-btn.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [isOpenForm, setIsOpenForm] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [source, setSource] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isOpenForm) {
            const fetchCategories = async () => {
                setLoadingCategories(true);

                const { data, error } = await supabase
                    .from("categories")
                    .select("id, name_ru, slug")
                    .order("name_ru");

                if (!error && data) {
                    setCategories(data);
                    // Автоматически выбираем первую категорию
                    if (data.length > 0) {
                        setCategoryId(data[0].id);
                    }
                }

                setLoadingCategories(false);
            };

            fetchCategories();
        }
    }, [isOpenForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !source || !category_id) {
            alert("Заполните все обязательные поля!");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from("news")
            .insert({
                title,
                content,
                source,
                image_url: image_url || null,
                category_id: Number(category_id),
            })
            .select();

        if (error) {
            console.error("Ошибка:", error);
            alert("Ошибка: " + error.message);
        } else {
            alert("Новость успешно добавлена!");
            setIsOpenForm(false);
            setTitle("");
            setContent("");
            setSource("");
            setImageUrl("");
            setCategoryId("");
            navigate("/");
        }
        setLoading(false);
    };

    return (
        <>
            <header className="header">
                <button className="menu-btn" onClick={toggleMenu}>
                    <img src={MenuBtn} alt="меню" />
                </button>
            </header>

            {/* Боковая панель */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <h2>Меню</h2>
                    <button className="close-btn" onClick={toggleMenu}>
                        X{/* <img src={CloseBtn} alt="закрыть" /> */}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/" className="nav-item" onClick={toggleMenu}>
                        Все новости
                    </Link>
                    <Link
                        to="/categories"
                        className="nav-item"
                        onClick={toggleMenu}
                    >
                        Категории
                    </Link>
                    <button
                        className="nav-item add-post-btn"
                        onClick={() => setIsOpenForm(true)}
                    >
                        Добавить пост
                    </button>
                </nav>
            </div>

            {isOpenForm && (
                <div
                    className="modal-overlay"
                    onClick={() => setIsOpenForm(false)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Добавить новость</h2>
                            <button
                                className="close-btn"
                                onClick={() => setIsOpenForm(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="add-form">
                            <input
                                type="text"
                                placeholder="Заголовок"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <textarea
                                placeholder="Содержание новости"
                                rows="6"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />

                            <input
                                type="url"
                                placeholder="Источник (ссылка)"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                required
                            />

                            <input
                                type="url"
                                placeholder="Ссылка на фото (необязательно)"
                                value={image_url}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />

                            {/* ← КРАСИВЫЙ ВЫПАДАЮЩИЙ СПИСОК КАТЕГОРИЙ */}
                            <select
                                value={category_id}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                                className="category-select"
                                disabled={loadingCategories}
                            >
                                {loadingCategories ? (
                                    <option>Загрузка категорий...</option>
                                ) : categories.length === 0 ? (
                                    <option>Нет категорий</option>
                                ) : (
                                    <>
                                        <option value="">
                                            Выберите категорию
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name_ru}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? "Публикация..." : "Опубликовать"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpenForm(false)}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Затемнение фона при открытом меню */}
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    );
};
