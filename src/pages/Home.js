import React,{useState} from 'react'
import Category from '../components/Home/Category';
import Slide from '../components/Slide';
import img from "../asset/images/Banner_Clothing.jpg"
import Footer from '../components/Footer';

function Home() {
    
    return (
        <>
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
