import React from "react";
import numeral from 'numeral';

export const CarPrice = (props) => {
    const {price}=props;
    const content=<div className="flex justify-center">
    <div className="flex justify-center bg-black text-white text-3xl py-5 px-9 font-heading">
        ${numeral(price).format("0,0")}
    </div>
    </div>;
    return content;
};