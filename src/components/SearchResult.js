import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../action/index';
import Footer from './Footer';
import HeaderSlide from './HeaderSlide';
import ProductItem from './ProductItem';

class SearchResult extends Component {


    render() {
        let {search, products, favorite} = this.props;
        console.log('a',search);
        console.log(favorite);
        console.log(products);
        if(search !== '') {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }

        if(products.length > 0) {
            products = products.map(product => <ProductItem product={product} favorite={favorite}/>);
        }
        else products = <h2 className='search-empty'>Không tìm thấy kết quả !</h2>
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
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        search: state.searchProducts,
        favorite: state.favoriteReducer
    }
}


export default connect(mapStateToProps)(SearchResult);
