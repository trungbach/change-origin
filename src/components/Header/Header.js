import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import * as actions from '../../action/index';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from 'react-google-login';


const Header = () =>  {

    const [ inputSearch, setInputSearch ] = useState('');
    const dispatch = useDispatch();
    let carts = useSelector(state => state.cartReducer);
    let favorites = useSelector(state => state.favoriteReducer);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    useEffect(() => {
        dispatch(actions.fetchFavoriteRequest());
        dispatch(actions.fetchCartsRequest());
        dispatch(actions.getIsLogin());
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [dispatch]);

    let newCarts = [];
    let newFavorites = [];
    let total = 0;
    if(carts.length)
        carts = carts.map((cart,index) => {
            total += cart.price * cart.quantity;
            if(newCarts.find(elm => elm.slug === cart.slug))
                return '';
            else {
                newCarts.push(cart);
                return (
                    <li key={index}>
                        <Link to={`/products/${cart.slug}`}>
                            <div className="cart-img">
                                <img src={cart.mainImg} alt=""/>
                            </div>
                            <div className="cart-item">
                                <h3>
                                    {cart.name.toLowerCase()}
                                </h3>
                                <p>{numeral(cart.price).format(0,0)} vnd</p>
                            </div>
                        </Link>
                    </li>
                );
            }    
        });
    if(favorites.length) {
        newFavorites = favorites.map((favorite, index) => {
            return (
                <li key={index}>
                    <Link to={`/products/${favorite.slug}`}>
                        <div className="cart-img">
                            <img src={favorite.mainImg} alt=""/>
                        </div>
                        <div className="cart-item">
                            <h3>
                                {favorite.name.toLowerCase()}
                            </h3>
                            <p>{numeral(favorite.price).format(0,0)} vnd</p>
                        </div>
                    </Link>
                </li>
            )
        });
    }

    const responseGoogle = (response) => {
        dispatch(actions.loginUser(response?.profileObj?.givenName, response?.profileObj?.imageUrl));
        setUser(JSON.parse(localStorage.getItem('profile')));
    }

    const handleInputSearch = (e) => {
        setInputSearch(e.target.value);
    }

    const handleSearch = () => {
        dispatch(actions.searchProduct(inputSearch));
    }
    
    const handleSignOut = () => {
        dispatch(actions.logoutUser());
        setUser(null);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <div className="container">
                    <Link to='/'>
                        <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Logo_Ananas_Header.svg" alt=""/>                
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page">home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/products' className="nav-link" aria-current="page">all shoes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/products/men' className="nav-link" aria-current="page">men</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/products/women' className="nav-link" aria-current="page">women</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" 
                                    onChange={handleInputSearch} 
                                    placeholder="Search" aria-label="Search" />
                            <button className="btn" onClick={handleSearch}>
                                <Link to='/search'>
                                    <i class="fas fa-search"></i>
                                </Link>
                            </button>
                        </form>
                        {/* FAVORITE LIST */}
                        <div className="cart">
                            <div className="cart-icon">
                                <span>{favorites ? favorites.length : 0}</span><i class="fas fa-heart"></i>
                            </div>
                            <div className="cart-content">
                                <ul>
                                   {newFavorites}
                                </ul>
                            </div>
                        </div>
                        <div className="cart">
                            <div className="cart-icon">
                                <span>{carts ? carts.length : 0}</span> <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div className="cart-content">
                                <ul>
                                   {carts}
                                   <li className='cart-total'>
                                        <p>Total: {numeral(total).format(0,0)} VND</p>
                                        <Link to='/cart'>Go to cart</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                           {user?.name ? ''
                             : <GoogleLogin  
                                clientId="586157721906-8ca913t35i5u9lk76vgcms0oi9360ff9.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}    
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}/>
                            }
                        </div>
                        <div className='user'>
                            {user?.avatar ? 
                                <>
                                    <img src={user?.avatar} alt=""/>
                                     {user?.name}
                                    <button className="btn btn-logout" title='Sign-out'
                                            onClick={handleSignOut}
                                    >
                                        <i class="fas fa-sign-out-alt"></i>
                                    </button>
                                </> : ''}
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </nav>
    )

}
export default Header;

