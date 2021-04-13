import React, { Component } from 'react';
import Filter from '../components/Filter';
import ProductsList from '../components/ProductsList';
import HeaderSlide from '../components/HeaderSlide';


class Men extends Component {

    render() {
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
}
export default Men;
