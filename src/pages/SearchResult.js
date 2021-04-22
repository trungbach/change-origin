import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import HeaderSlide from '../components/Header/HeaderSlide';
import ProductItem from '../components/Products/ProductItem';
import * as actions from '../action/index';
import { useDispatch, useSelector } from 'react-redux';

const SearchResult = () => {

    let products =  useSelector(state => state.products);
    const search = useSelector(state => state.searchProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSearchKey());
        dispatch(actions.fetchProductsRequest());
    }, []);

    if(search !== '') {
        products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(products.length > 0) {
        products = products.map(product => <ProductItem product={product} />);
    } else products = <h2 className='search-empty'>Không tìm thấy kết quả !</h2>

    return (
        <div className="search-result">
            <HeaderSlide />
            <div className="search-result__inner">
                <div className="container py-5">
                    <div className="search-result__notify">
                        <h2>tìm thấy {products.length > 0 ? products.length : 0} kết quả cho <span>"{search}"</span></h2>
                    </div>
                    <div className="products__list row py-5">
                        {products}
                    </div>
                    <div className='search-result__back'>
                        <Link to='/products' className='back-to-products'>xem tất cả sản phẩm</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;
