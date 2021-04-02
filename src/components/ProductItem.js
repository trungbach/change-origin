import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import heart from '../asset/images/heart.png';
import numeral from 'numeral';
import * as actions from '../action/index';

export default function ProductItem({product, favorite}) {
    
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(isFavorite);
        console.log(favorite);
        if(favorite.length) {
            favorite.forEach(({slug}) => {
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
            favorite.forEach(({slug, id}) => {
                if(slug === product.slug) {
                    isExist = true;
                    dispatch(actions.removeFromFavorite(id, slug));
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
                    <button type='btn' className={isFavorite ? 'isFavorite add-to-favorite btn' : 'add-to-favorite btn'} 
                            onClick={handleAddToFavorite}
                    >
                        <img src={heart} alt="" />
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