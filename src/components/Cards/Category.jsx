import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";

export const Category = (props) => {
    return (
        <>
            <Link className="ccategory" to={`/${props.slug}`}>
                <div>
                    <img src={props.icon} />
                </div>
                <div>{props.name_ru}</div>
            </Link>
        </>
    );
};
