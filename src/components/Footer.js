import React from 'react';
import arrow from '../asset/images/arrow_right.jpg';
import ananas from '../asset/images/Logo_Ananas_Footer.svg';
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer__list">
                <div className="footer__item">
                    <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Store.svg" alt=""/>
                </div>
                <div className="footer__item">
                    <h3>sản phẩm</h3>
                    <a href="">giày nam</a>
                    <a href="">giày nữ</a>
                    <a href="">thời trang - Phụ kiện</a>
                    <a href="">sale-off</a>
                </div>
                <div className="footer__item">
                    <h3>về công ty</h3>
                    <a href="">Dứa tuyển dụng</a>
                    <a href="">liên hệ nhượng quyền</a>
                    <a href="">về Ananas</a>
                </div>
                <div className="footer__item">
                    <h3>hỗ trợ</h3>
                    <a href="">FAQs</a>
                    <a href="">bảo mật thông tin</a>
                    <a href="">chính sách chung</a>
                    <a href="">tra cứu đơn hàng</a>
                </div>
                <div className="footer__item">
                    <h3>liên hệ</h3>
                    <a href="">email góp ý</a>
                    <a href="">hotline</a>
                    <a href="">0816 237 678</a>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="footer__store">
                    <a href=""><h3>tìm cửa hàng</h3></a>
                </div>
                <div className="footer__social footer__item">
                    <h3>ananas social</h3>
                    <a href=""><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_facebook.svg" alt=""/></a>
                    <a href=""><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_instagram.svg" alt=""/></a>
                    <a href=""><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_youtube.svg" alt=""/></a>
                </div>
                <div className="footer__email footer__item">
                    <h3>đăng ký nhận mail</h3>
                    <input type="text"/>
                    <a href=''><img src={arrow} alt=""/></a>
                </div>
                <div className="footer__item footer__logo">
                    <a href=""><img src={ananas} alt=""/></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
