import React from 'react';
import Filter from '../components/Filter/Filter';
import HeaderSlide from '../components/Header/HeaderSlide';
import ProductsList from '../components/Products/ProductsList';
const Women = () =>  {

    return (
        <div>
            <HeaderSlide />
            <div className='products container'>
                <Filter />
                <ProductsList gender='women' />
            </div>
        </div>
    );
}
export default Women;
