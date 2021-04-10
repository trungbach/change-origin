import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import heart from '../asset/images/heart.png';
import numeral from 'numeral';
import * as actions from '../action/index';

export default function ProductItem({product, favorite}) {
    
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoriteReducer);
    
    useEffect(() => {
        console.log(favorites);
        // console.log(isFavorite);
        console.log(favorite);
        // if(favorite.length) {
        //     favorite.forEach(({slug}) => {
        //         if(slug === product.slug) {
        //             console.log(slug);
        //             setIsFavorite(true);
        //             return false;
        //         }
        //     })
        // }
        if(favorites.length) {
            favorites.forEach(({slug}) => {
                if(slug === product.slug) {
                    console.log(slug);
                    setIsFavorite(true);
                    return false;
                }
            })
        }
    }, []);

    const handleAddToFavorite = () => {
        if(favorite.length) {
            let isExist = false;
            favorite.forEach(({slug}) => {
                if(slug === product.slug) {
                    isExist = true;
                    dispatch(actions.removeFromFavorite(slug));
                    setIsFavorite(false);
                    return false;
                }
            })
            if(!isExist) {
                dispatch(actions.addToFavorite(product));
                setIsFavorite(true);
            }
        }
        else {
            dispatch(actions.addToFavorite(product));
            setIsFavorite(true);
        }
    }

    return (
        <div className='products__item col-lg-4 col-xl-4 col-md-6 col-sm-6'>
           <div className="products__thumbnail">
                <div className="products__item-content">
                    {product.limitedEdition ? <p className="products__item-limited">limited edition</p> : ''}
                    <Link to={`/products/${product.slug}`} className='product__item-img'>
                        <img className='img-primary' src={product.images[0].url} alt=""/>
                        <img className='img-secondary' src={product.images[1].url} alt=""/>
                    </Link>
                </div>
                <div className="products__item-add">
                    <Link to={`/products/${product.slug}`}>
                        <button className="add-to-cart btn">
                            XEM CHI TIẾT
                        </button>
                    </Link>
                    <button type='btn' className='add-to-favorite btn' 
                            onClick={handleAddToFavorite}
                    >
                        {isFavorite ? <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="32.5" height="29.2" viewBox="0 0 32.5 29.2">
                                            <path class="cls-1" d="M16.25,8.8749A7.5051,7.5051,0,0,0,7.49,1.4777,7.7789,7.7789,0,0,0,1.25,9.2762v.2422a7.5,7.5,0,0,0,2.1967,
                                                5.3033L16.25,27.6249,29.0532,14.8217A7.5,7.5,0,0,0,31.25,9.5184V9.2762a7.7789,7.7789,0,0,0-6.24-7.7985,7.505,7.505,0,0,0-8.76,7.3972"
                                            />
                                      </svg> : <img src={heart} alt="" />}
                    </button>
                </div>
                <div className="products__item-caption">
                    {product.newArrival ? <p className="products__item-new">new arrival</p> : ''}
                    <Link to={`/products/${product.slug}`} className='item__name' >
                        <h2>{product.name}</h2>
                    </Link>
                    <p className='item__color'>{product.color}</p>        
                    <p className='item__price'>{numeral(product.price).format('0,0')} vnd</p>
                </div>
                
           </div>
        </div>
    )
}