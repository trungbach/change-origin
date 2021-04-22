import React  from 'react';
import Filter from '../components/Filter/Filter';
import ProductsList from '../components/Products/ProductsList';
import HeaderSlide from '../components/Header/HeaderSlide';

const Products = () => {

    return (
        <div>
            <HeaderSlide />
            <div className='products container'>
                <Filter />
                <ProductsList />
            </div>
        </div>
    );
}
export default Products;
