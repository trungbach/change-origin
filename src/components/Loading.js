import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function Loading() {
    return (
        <div className='loading'>
            <Loader
                type="Bars"
                color="#f15e2c"
                height={100}
                width={100}
                timeout={10000} //3 secs
            />
        </div>
    )
}
