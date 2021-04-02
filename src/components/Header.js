import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import numeral from 'numeral';
import * as actions from '../action/index';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from 'react-google-login';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputSearch: '',
            name: '',
            avatar: ''
        }
    }
    
    responseGoogle = (response) => {
        console.log(response);
        this.props.handleLogin(response.profileObj.givenName, response.profileObj.imageUrl);
    }

    componentDidMount() {
        this.props.getCarts();
        this.props.getFavorite();
    }

    handleInputSearch = (e) => {
        this.setState({
            inputSearch: e.target.value
        })
    }

    handleSearch = () => {
        let {inputSearch} = this.state
        this.props.onSearch(inputSearch);
    }
    
    handleSignOut = () => {
        this.props.handleLogOut();
    }

    render() {
        let {carts, favorites, login} = this.props;
        let {name, avatar, isLogin} = login;
        let newCarts = [];
        let newFavorites = [];
        let total = 0;
        if(carts.length > 0)
            carts = carts.map(cart => {
                total += cart.price * cart.quantity;
                if(newCarts.find(elm => elm.slug === cart.slug))
                    return '';
                else {
                    newCarts.push(cart);
                    return (
                        <li>
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
            if(favorites.length > 0) {
                newFavorites = favorites.map(favorite => {
                    return (
                        <li>
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
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                    onChange={this.handleInputSearch} 
                                    placeholder="Search" aria-label="Search" />
                            <button className="btn" type="submit" onClick = {this.handleSearch}>
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
                           {name ? ''
                             : <GoogleLogin 
                                clientId="586157721906-8ca913t35i5u9lk76vgcms0oi9360ff9.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.responseGoogle}    
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}/>
                            }
                        </div>
                        <div className='user'>
                            {avatar ? 
                                <>
                                    <img src={avatar} alt=""/>
                                     {name}
                                    <button className="btn btn-logout" title='Sign-out'
                                            onClick={()=>this.handleSignOut()}
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
}

const mapStateToProps = (state) => {
    return {
        carts: state.cartReducer,
        favorites: state.favoriteReducer,
        login: state.isLogin
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (inputSearch) => {
            dispatch(actions.searchProduct(inputSearch));
        },
        getCarts: () => {
            dispatch(actions.fetchCartsRequest());
        },
        getFavorite: () => {
            dispatch(actions.fetchFavoriteRequest());
        },
        handleLogin: (name, avatar) => {
            dispatch(actions.loginUser(name, avatar));
        },
        handleLogOut: () => {
            dispatch(actions.logoutUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

