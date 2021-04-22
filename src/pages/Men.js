import React  from 'react';
import Filter from '../components/Filter/Filter';
import ProductsList from '../components/Products/ProductsList';
import HeaderSlide from '../components/Header/HeaderSlide';

const Men = () => {

    return (
        <div>
            <HeaderSlide />
            <div className='products container'>
                <Filter />
                <ProductsList gender='men' />
            </div>
        </div>
    );
}
export default Men;
