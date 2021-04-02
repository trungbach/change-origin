import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../action/index';


const b = 3;
export const a = () => {
    console.log(b);
}

export default function HandleFavorite(cart) {
    // const favorites = useSelector(state => state.favoriteReducer);
    //     console.log(favorites);
    // export const handleAddToFavorite = (cart) => {
        
        // if(props.favorite.length) {
        //     let isExist = false;
        //     tprops.favorite.forEach(({slug, id}) => {
        //         if(slug === cart.slug) {
        //             isExist = true;                    
        //             this.props.handleRemoveToFavorite(id, cart.slug);
        //             return false;
        //         }
        //     })
        //     if(!isExist) {
        //         this.props.handleAddToFavorite(cart);
        //     }
        // }
        // else {
        //     this.props.handleAddToFavorite(cart);
        // }
    return (
        <></>
    )
}

