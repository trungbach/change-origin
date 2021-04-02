import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/index';
import {Link} from 'react-router-dom';
import HeaderSlide from '../components/HeaderSlide';
import numeral from 'numeral';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as message from '../Message';
import Footer from '../components/Footer';
import {a} from '../util/HandleFavorite';


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            quantity: 0,
            isSale: false,
            total: 0
        }
    }

    componentDidMount() {
        this.props.getCarts();
        console.log(typeof handleFavorite);
    }

    handleChangeOption = (e, slug, size, quantity) => {
        let target = e.target;
        const name = target.name;
        const value = parseInt(target.value);
       
        let {carts} = this.props;
        if(name === 'size') {
            let cartItem = carts.find(cart => cart.slug === slug && cart.size === value);
            if(cartItem)  {
                toast.warning(message.SIZE_EXIST);
                this.setState({
                    [name]: value
                });
            } else {

            }
        }
        // this.props.handleChangeToCart()
    }

    handleChangeQuan = (value, quantity, slug, size, id) => {
        if(value === -1 && quantity === 1) {
            this.handleRemoveToCart(slug);
        } else {
            this.props.handleChangeToCart(slug, size, quantity + value, id);
            toast.success('Cập nhật giỏ hàng thành công !');
        }
    }

    handleRemoveToCart = (slug) => {
        let {id} = this.props.carts.find(item => item.slug === slug);
        this.props.handleRemoveToCart(id, slug);
    }

    handleChangeSaleCode = (e) => {
        let value = e.target.value;
        this.setState({
            saleCode: value
        })
    }

    handleKeyEnter = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            this.handleCheckCode();
        }
    }
    
    handleCheckCode = () => {
        if(this.state.isSale)
                toast.error(message.LOOP_CODE);
        else {
            if(this.state.saleCode !== 'bachtrung') {
                toast.error(message.WRONG_CODE);
            } else {
                toast.success(message.RIGHT_CODE);
                this.setState({
                    isSale: true,
                });
            }
        }
        this.setState({
            saleCode: ''
        })
    }

    hanleAddToFavorite = (cart) => {
        if(this.props.favorite.length) {
            console.log(this.props.favorite[0].id);
            let isExist = false;
            this.props.favorite.forEach(({slug, id}) => {
                if(slug === cart.slug) {
                    isExist = true;                    
                    console.log(id);
                    this.props.handleRemoveToFavorite(id, slug);
                    return false;
                }
            })
            console.log(isExist);
            if(!isExist) {
                this.props.handleAddToFavorite(cart);
            }
        }
        else {
            this.props.handleAddToFavorite(cart);
        }
    }

    render() {
        let {isSale} = this.state;
        let sale = 0;
        let {carts, favorite} = this.props;
        let total = 0;
       
        let cartList = [];
        if(carts.length > 0) {
            cartList = carts.map(cart => {
                total += cart.price * cart.quantity;
                let isFavorite = false;
                if(favorite.length) {
                    favorite.forEach(favoriteItem => {
                        if(favoriteItem.slug === cart.slug)
                            isFavorite = true;
                    })
                }
                return (
                    <li>
                        <div className='li-top'>
                            <Link to={`products/${cart.slug}`} className="cart-img">
                                <img src={cart.mainImg} alt=""/>
                            </Link>
                            <div className="cart-info">
                                <div className="cart-name">
                                    <h3>{cart.name.toLowerCase()}</h3>
                                    <p>{numeral(cart.price*cart.quantity).format(0.0)} vnd</p>
                                </div>
                                <p className="cart-price">Giá: {numeral(cart.price).format(0,0)}  VND</p>
                                <div className="cart-option">
                                    <div className="option">
                                        <div className="option__size">
                                            <h3>size</h3>
                                            <select className="form-control mr-sm-2"
                                                name='size' onChange={(e) => this.handleChangeOption(e,cart.slug,cart.size)}
                                            >
                                                <option value={cart.size}>{cart.size}</option>
                                                <option value={36}>36</option>
                                                <option value={37}>37</option>
                                                <option value={38}>38</option>
                                                <option value={39}>39</option>
                                                <option value={40}>40</option>
                                                <option value={41}>41</option>
                                                <option value={42}>42</option>
                                                <option value={43}>43</option>
                                                <option value={44}>44</option>
                                            </select>
                                        </div>
                                        <div className="option__quantity">
                                            <h3>số lượng</h3>
                                            <button className="btn" onClick={() => this.handleChangeQuan(-1, cart.quantity, cart.slug, cart.size, cart.id)}>-</button>
                                            {cart.quantity}
                                            <button className="btn" onClick={() => this.handleChangeQuan(1, cart.quantity, cart.slug, cart.size, cart.id)}>+</button>
                                        </div>
                                    </div>
                                    <div className="cart-option__right">
                                        <button className={isFavorite ? "btn add-to-favorite favorite" : "btn add-to-favorite"} 
                                                onClick={() => this.hanleAddToFavorite(cart) }>
                                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="20.4287" height="18" viewBox="0 0 20.4287 18">
                                                <path class="cls-1" d="M10.4286,6.8322A4.86,4.86,0,0,0,4.7557,2.0416,5.0377,5.0377,0,0,0,.7143,7.0921V7.249a4.8574,
                                                                    4.8574,0,0,0,1.4226,3.4345l8.2917,8.2916L18.72,10.6835A4.8571,4.8571,0,0,0,20.1429,
                                                                    7.249V7.0921a5.0378,5.0378,0,0,0-4.0414-5.05,4.86,4.86,0,0,0-5.6729,4.7906" 
                                                                    transform="translate(-0.2143 -1.4751)"/>
                                            </svg>
                                        </button>
                                        <br/>
                                        <button className="btn delete-to-cart"  onClick={() => this.handleRemoveToCart(cart.slug)}>
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </li>
                    )
            });
        } else cartList = <li className='cart-empty'>
            <h2 className='text-center'>Giỏ hàng của bạn đang trống !</h2>
            <Link to='/products' className='back-to-products'>quay lại cửa hàng</Link>
            </li>
        let oldTotal = total;
        if(isSale) {
            sale = total * 0.1;
            total = total * 0.9;    
        }
      
        return (
            <>
                <HeaderSlide />
               
                <div className='container py-5'>
                    <div className="row carts">
                        <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="carts-list">
                                <h1>giỏ hàng</h1>
                                <ul>
                                    {cartList}
                                </ul>
                            </div>
                        </div>
                       
                        
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="carts-pay">
                                <h2>đơn hàng</h2>
                                <p className='carts-pay-sale-code'>bạn có 1 mã khuyến mãi, nhập <strong>bachtrung</strong> để được giảm 10%</p>
                                <h3>nhập mã khuyến mãi :</h3>
                                <form className="form-inline">
                                    <input type="text" className="form-control mb-2 mr-sm-2" 
                                           value={this.state.saleCode} onChange={this.handleChangeSaleCode} onKeyDown={this.handleKeyEnter} />
                                    <button type="button" className="btn mb-2" 
                                            onClick={this.handleCheckCode}>
                                               Áp dụng
                                    </button>
                                </form>
                                <p className={isSale ? "carts-pay-saled" : "hide"}>mã khuyến mãi đã được áp dụng</p>
                                <div className="divider"></div>
                                <div className="carts-pay-order">
                                    <h4>đơn hàng</h4>
                                    <p>{numeral(oldTotal).format(0,0)} vnđ</p>
                                </div>
                                <div className="carts-pay-sale">
                                    <p>Giảm</p>
                                    <p>{sale > 0 ? numeral(sale).format(0,0) : 0} vnđ</p>
                                </div>
                                <div className="divider"></div>
                                <div className="carts-pay-total">
                                    <p>tạm tính</p>
                                    <p>{numeral(total).format(0,0)} vnđ</p>
                                </div>
                                <div className="carts-pay-action">
                                    <Link to='/checkout'>
                                        <button className="btn back-to-products" disabled = {carts.length === 0}>
                                            tiếp tục thanh toán
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    { carts.length ? <Link to='/products' className='back-to-products'>Tiếp tục mua sắm</Link> : '  '}
                </div>
                <ToastContainer autoClose={2000} />
            </>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        carts: state.cartReducer,
        favorite: state.favoriteReducer
    }
}

const mapDispatchToState = (dispatch, props) => {
    return {
        getCarts: () => {
            dispatch(actions.fetchCartsRequest());
        },
        handleRemoveToCart: (id, slug) => {
            dispatch(actions.removeFromCart(id, slug))
        },
        handleChangeToCart: (slug, size, quantity, id) => {
            dispatch(actions.changeToCart(slug, size, quantity, id));
        },
        handleAddToFavorite: (favoriteItem) => {
            dispatch(actions.addToFavorite(favoriteItem));
        },
        handleRemoveToFavorite: (id, slug) => {
            dispatch(actions.removeFromFavorite(id, slug));
        },
        fetchFavorite: () => {
            dispatch(actions.fetchFavoriteRequest());
        }
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Cart);
