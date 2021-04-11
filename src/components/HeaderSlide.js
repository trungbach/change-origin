import React, { Component } from "react";
import Slider from "react-slick";

export default class HeaderSlide extends Component {

    render() {
        const settings = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 8000,
            autoplaySpeed: 2000,
            cssEase: "linear"
        };
        return (
            <div className='header-slide slick-hidden'>
                <Slider {...settings}>
                    <div>
                        <h3>FREE SHIPPING VỚI HÓA ĐƠN TỪ 800K !</h3>
                    </div>
                    <div>
                        <h3>HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}