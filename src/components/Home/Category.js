import React from 'react'
import {Link} from 'react-router-dom';

function Category() {
    return (
        <div className='category'>
            <h2 className="title">
                danh mục mua hàng
            </h2>
            <div className="category__list">
                <div className="category__item category__item1">
                    <div className="black-bg"></div>
                    <div className="category__item-content">
                        <Link to='/men'><h3>giày nam</h3></Link>
                        <Link to='/men/new-arrivals'><p>new arivals</p></Link>
                        <Link to='/men/best-seller'><p>best seller</p></Link>
                        <Link to='/men/'><p>sale-off</p></Link>
                    </div>
                </div>
                <div className="category__item category__item2">
                    <div className="black-bg"></div>
                    <div className="category__item-content">
                        <Link to='/men'><h3>giày nam</h3></Link>
                        <Link to='/men/new-arrivals'><p>new arivals</p></Link>
                        <Link to='/men/best-seller'><p>best seller</p></Link>
                        <Link to='/men/'><p>sale-off</p></Link>
                    </div>
                </div>
                <div className="category__item category__item3">
                    <div className="black-bg"></div>
                    <div className="category__item-content">
                        <Link to='/men'><h3>giày nam</h3></Link>
                        <Link to='/men/new-arrivals'><p>new arivals</p></Link>
                        <Link to='/men/best-seller'><p>best seller</p></Link>
                        <Link to='/men/'><p>sale-off</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
