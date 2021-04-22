import React,{useState} from 'react'
import Category from '../components/Home/Category';
import Slide from '../components/Home/Slide';
import img from "../asset/images/Banner_Clothing.jpg"
import HeaderSlide from '../components/Header/HeaderSlide';

function Home() {
    
    return (
        <>
            <HeaderSlide />
            <Slide />
            <Category />
            {/* BestSeller */}
            <div className="banner-clothing">
                <img src={img} alt=""/>
            </div>
        </>
    )
}

export default Home
