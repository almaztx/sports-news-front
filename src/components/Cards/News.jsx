import React from "react";
import "./News.css";
import { Link } from "react-router-dom";

export const News = (props) => {
    return (
        <div className="card-news">
            <Link to={`/${props.categorySlug}/${props.id}`}>
                <div className="ntitle">{props.title}</div>
                <div className="ndate">{props.date}</div>
                <div className="ncategory">{props.category}</div>
            </Link>
        </div>
    );
};
