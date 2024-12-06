import React from "react";
import { Link } from "gatsby";

export const CallToActionButton = (props) => {
    const { destination, label, fullWidth, isActive } = props;
    const content=<div>
    <Link to={destination} 
        className={`${isActive?"cursor-default bg-yellow-400":""} ${fullWidth?"block":"inline-block"} btn`}>
        {label}
    </Link>
    </div>;
    return content;
};