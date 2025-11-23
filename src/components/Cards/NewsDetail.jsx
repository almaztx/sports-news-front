import React from "react";
import "./NewsDetail.css";
import { Link } from "react-router-dom";

export const NewsDetail = (props) => {
    return (
        <div className="news-detail">
            <div className="dtitle">{props.title}</div>
            <div className="ddate">{props.date}</div>
            <div className="dcontent">{props.content}</div>
            {props.image_url && (
                <div className="dimage">
                    <img src={props.image_url} />
                </div>
            )}
            <div className="dsource">
                Источник: <span>{props.source}</span>
            </div>
            {props.category && props.categorySlug && (
                <div className="dcategory">
                    <Link to={`/${props.categorySlug}`}>{props.category}</Link>
                </div>
            )}
        </div>
    );
};
