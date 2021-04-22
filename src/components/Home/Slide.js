import React  from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img4 from '../../asset/images/banner-chính_2.jpg';
import img2 from '../../asset/images/AnanasxLuckyLuke-Pack_banner_desktop.jpg';
import img3 from '../../asset/images/Corluray_bannerweb_desktop1920x1050.jpg';
import img1 from '../../asset/images/KV_Urbas_Unsettling_Banner_Desktop_1920x1050.jpg';

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider" id='slider'>
            <Slider {...settings} >
                <div>
                    <img src={img1} alt=""/>
                </div>
                <div>
                    <img src={img2} alt=""/>
                </div>
                <div>
                    <img src={img3} alt=""/>
                </div>
                <div>
                    <img src={img4} alt=""/>
                </div>
            </Slider>
        </div>
    )
}
export default Slide;
