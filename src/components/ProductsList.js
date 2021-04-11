import React, { Component } from 'react';
import ProductItem from './ProductItem';
import {connect} from 'react-redux';
import * as actions from '../action/index';
import TaskControl from './TaskControl';
import Skeleton from 'react-loading-skeleton';


class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            value: 0,
        }
    }

    componentDidMount() {
        this.props.getFavorite();
    }

    handleSort = (type, value) => {
        this.setState({
            type: type,
            value: value
        })
    }

    render() {
        // console.log(this.props);

        let { filter, gender, favorite, products} = this.props;
        let loading = true;
        // console.log(favorite);
        if(products.length > 0) loading = false;
        if(gender === 'men') {
            products = products.filter(product => product.gender === 'men' || product.gender === 'unisex');
        }
        if(gender === 'women') {
            products = products.filter(product => product.gender === 'women' || product.gender === 'unisex');
        }
        let {type, value} = this.state;
        if(type === 'name') {
            products.sort((a,b) => {
                if(a.name > b.name) return value;
                else if(a.name < b.name) return -value;
                else return 0;
            });
            
        } else if(type === 'price') {
            products.sort((a, b) => {
                if(a.price > b.price) return value;
                else if(a.price < b.price) return -value;
                else return 0;
            })
        } else {
            products.sort((a,b) => {
                return b.sold - a.sold;
            })
        }
        if(filter.colorName !== '') {
            products = products.filter(product => product.typeColor === filter.colorName);
        }
        if(filter.saleOff) {
            products = products.filter(product => product.saleOff === filter.saleOff);
        }
        if(filter.limitedEdition) {
            products = products.filter(product => product.limitedEdition === filter.limitedEdition);
        }
        if(filter.bestSeller) {
            products = products.filter(product => product.bestSeller === filter.bestSeller);
        }
        if(filter.newArrival) {
            products = products.filter(product => product.newArrival === filter.newArrival);
        }
        if(filter.onlineOnly) {
            products = products.filter(product => product.onlineOnly === filter.onlineOnly);
        }
        if(filter.style !== 'all') {
            products = products.filter(product => product.style === filter.style);
        }
        if(filter.type !== 'all') {
            products = products.filter(product => product.type === filter.type);
        }
        if(filter.by !== 'all') {
            products = products.filter(product => product.by === filter.by);
        }
        products = products.filter(product => product.price <= filter.price);
        if(products.length > 0)
            products = products.map((product,index) => <ProductItem key={index} type={type} product={product} favorite={favorite}/>)

        return (
            <div className='products__container'>
                
                <TaskControl quantity={products.length} handleSort={this.handleSort} />
                {loading ?
                    (<Skeleton count={50} />) : (
                <div className='products__list row'>
                    {products.length > 0 ? products : <h2 className='products__empty'>Sorry, can't find your result</h2>}
                </div>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        filter: state.filterProduct,
        favorite: state.favoriteReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getFavorite: () => {
            dispatch(actions.fetchFavoriteRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
