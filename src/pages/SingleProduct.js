import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../action/index';
import Footer from '../components/Footer';
import HeaderSlide from '../components/HeaderSlide';
import numeral from 'numeral';
import heart from '../asset/images/heart.png';
import sizeChart from '../asset/images/Sizechart.jpg';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as message from '../Message';

class SingleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainImg: '',
            size: 0,
            quantity: 0
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchFavorite();
    }

    handleChangeImg = (url) => {
        this.setState({
            mainImg: url
        })
    }

    handleChangeOption = (e) => {
        let target = e.target;
        const name = target.name;
        const value = parseInt(target.value);
        this.setState({
            [name]: value
        });
    }

    handleAddToCart = (product) => {
        let {size, quantity} = this.state;
        
        if(size === 0 || quantity === 0 )
            toast.warning(message.PICK_SIZE_AND_QUANTITY);
        else {
            if(this.props.carts.length > 0) {
                let newCarts = this.props.carts.filter(item => item.slug === product.slug);
                if(newCarts.length > 0) {
                    var i = 0;
                    for(i = 0;i < newCarts.length;i++) {
                        if(size === newCarts[i].size) {
                            let {id} = newCarts[i];
                            quantity += newCarts[i].quantity;
                            toast.error('Thay đổi số lượng cần mua thành công!');
                            this.props.handleChangeToCart(product.slug, size, quantity, id);
                            break;
                        }  
                    }
                    if(i===newCarts.length) this.props.handleAddToCart(product, size, quantity);
                } else this.props.handleAddToCart(product, size, quantity);
            } else this.props.handleAddToCart(product, size, quantity);
        }
    }

    handleAddToFavorite = (product) => {
        if(this.props.favorite.length) {
            console.log(this.props.favorite[0].id);
            let isExist = false;
            this.props.favorite.forEach(({slug}) => {
                if(slug === product.slug) {
                    isExist = true;                    
                    this.props.handleRemoveToFavorite(product.slug);
                    return false;
                }
            })
            console.log(isExist);
            if(!isExist) {
                this.props.handleAddToFavorite(product);
            }
        }
        else {
            this.props.handleAddToFavorite(product);
        }
    }
   

    render() {
        let {products, favorite} = this.props;
        let {slug} = this.props.match.params;
        let product = products.find(product => product.slug === slug);
        let {mainImg} = this.state;
        if(mainImg === '' && product)
            mainImg = product.images[0].url;
        let isFavorite = false;
        if(favorite.length) {
            favorite.forEach(favoriteItem => {
                if(favoriteItem.slug === slug)
                    isFavorite = true;
            })
        }
        return (
            <>
                <HeaderSlide />
                {product ? <div className="container-fluid products__detail">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 back">
                            <Link to='/products' className='back-to-products'>
                                <i class="fas fa-long-arrow-alt-left"></i>  quay lại shop
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-7 col-lg-7">
                            <div className="wrapper-slide">
                                <div className="products__detail-main-img">
                                    <img src={mainImg} alt=""/>
                                </div>
                                <div className="products__detail-extra-img row">
                                    <button type='button' className='btn' 
                                            onClick={() => this.handleChangeImg(product.images[0].url)}>
                                        <img src={product.images[0].url} alt=""/>
                                    </button>
                                    <button  type='button' className='btn'
                                             onClick={() => this.handleChangeImg(product.images[1].url)}>
                                        <img src={product.images[1].url} alt=""/>
                                    </button>
                                    <button type='button' className='btn'
                                            onClick={() => this.handleChangeImg(product.images[2].url)}>
                                        <img src={product.images[2].url} alt=""/>
                                    </button>
                                    <button type='button' className='btn'
                                            onClick={() => this.handleChangeImg(product.images[3].url)}>
                                        <img src={product.images[3].url} alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-5 col-lg-5 products__detail-right">
                            <h2 className="name">
                                {product.name} - {product.style}
                            </h2>
                            <div className="info">
                                <p>Mã sản phẩm: {product.slug}</p>
                                <p>Tình trạng: {product.newArrival ? <span>New Arrival</span> : <span>Còn hàng</span> }</p>
                            </div>
                            <div className="price-sold">
                                <h3 className="price">{numeral(product.price).format(0,0)} VND</h3>
                                <p className="sold">đã bán: {product.sold}</p>
                            </div>
                            <div className="divider"></div>
                            <p className="overview">{product.overview}</p>
                            <div className="divider"></div>
                            <div className="option">
                                <div className="option__size">
                                    <h3>size</h3>
                                    <select className="form-control mr-sm-2"
                                           name='size' onChange={this.handleChangeOption}
                                    >
                                        <option selected value={0}>Choose...</option>
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
                                    <input type="number" className="form-control mr-sm-2" min={1} max={100}
                                            name='quantity' onChange={this.handleChangeOption}
                                    />
                                </div>
                            </div>
                            <div className='products__detail-add'>
                                <button className="btn add-to-cart" onClick={()=>this.handleAddToCart(product)}>
                                    <i class="fas fa-cart-plus"></i> Add to cart
                                </button>
                                <button className={isFavorite ? "btn add-to-favorite favorite" : "btn add-to-favorite "}
                                        onClick={() => this.handleAddToFavorite(product)}>
                                    <img src={heart} alt="" />
                                </button>
                            </div>
                            <div className="filter__item">
                                <p className='mb-3'>
                                    <button class="btn shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse2">
                                        <h2>thông tin sản phẩm <i class="fas fa-chevron-down"></i></h2>
                                    </button>
                                </p>
                                <div class="collapse show products__detail-info" id="collapse1">
                                    <p>-gender: {product.info[0]}</p>
                                    <p>-size run: {product.info[1]}</p>
                                    <p>-upper: {product.info[2]}</p>
                                    <p>-outsole: {product.info[3]}</p>
                                    <p className="mt-5">{product.info[4]}</p>
                                    <img src={sizeChart} alt=""/>
                                </div>
                            </div>   
                            <div className="divider"></div>
                            <div className="filter__item">
                                <p className='mb-3'>
                                    <button class="btn shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                        <h2>quy định đổi sản phẩm <i class="fas fa-chevron-down"></i></h2>
                                    </button>
                                </p>
                                <div class="collapse" id="collapse2">
                                    <p>
                                        Đối với những sản phẩm giày và thời trang thuộc phiên bản giới hạn. 
                                        Vì nhiều lý do chúng tôi sẽ không áp dụng chính sách đổi hàng. 
                                        Vui lòng cân nhắc kỹ trước khi quyết định mua.
                                    </p>
                                </div>
                            </div> 
                            <div className="divider"></div>  
                            <div className="filter__item">
                                <p className='mb-3'>
                                    <button class="btn shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse2">
                                        <h2>bảo hành thế nào ? <i class="fas fa-chevron-down"></i></h2>
                                    </button>
                                </p>
                                <div class="collapse" id="collapse3">
                                    <p>
                                        Mỗi đôi giày Ananas trước khi xuất xưởng đều trải qua nhiều khâu kiểm tra. 
                                        Tuy vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, 
                                        đứt chỉ may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn sớm gửi 
                                        sản phẩm về Ananas nhằm giúp chúng tôi có cơ hội phục vụ bạn tốt hơn. 
                                        Vui lòng gửi sản phẩm về bất kỳ cửa hàng Ananas nào, hoặc gửi đến trung tâm 
                                        bảo hành Ananas ngay trong trung tâm TP.HCM trong giờ hành chính:<br />
                                        Lầu 1, 75/1 Mai Thị Lựu, P. Đa Kao, Q1, TP.HCM<br></br>
                                        Hotline: 028 3526 7774
                                    </p>
                                </div>
                            </div>   
                            <div className="divider"></div>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div> : '' }
                <ToastContainer autoClose={2000} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        carts: state.cartReducer,
        favorite: state.favoriteReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProducts: () => {
            dispatch(actions.fetchProductsRequest());
        },
        handleAddToCart: (product, size, quantity) => {
            dispatch(actions.addToCart(product, size, quantity));
        },
        handleChangeToCart: (slug, size, quantity, id) => {
            dispatch(actions.changeToCart(slug, size, quantity, id));
        },
        fetchFavorite: () => {
            dispatch(actions.fetchFavoriteRequest());
        },
        handleAddToFavorite: (favoriteItem) => {
            dispatch(actions.addToFavorite(favoriteItem));
        },
        handleRemoveToFavorite: (slug) => {
            dispatch(actions.removeFromFavorite(slug));
        }
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(SingleProduct);

