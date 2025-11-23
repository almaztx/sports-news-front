import { Home } from "../pages/HomePage/Home";
import { Detail } from "../pages/DetailPage/Detail";
import { Categories } from "../pages/CategoriesPage/Categories";

import {
    ALL_NEWS,
    DETAIL_NEWS,
    CATEGORIES_PAGE,
    CATEGORY_PAGE,
} from "./consts";
import { CategoryList } from "../pages/CategoryListPage/CategoryList";

export const routes = [
    {
        path: ALL_NEWS,
        element: Home,
    },
    {
        path: DETAIL_NEWS,
        element: Detail,
    },
    {
        path: CATEGORIES_PAGE,
        element: Categories,
    },
    {
        path: CATEGORY_PAGE,
        element: CategoryList,
    },
];
