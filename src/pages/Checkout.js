import React,{Component} from 'react';
import {ProgressBar, Step} from 'react-step-progress-bar';
import "react-step-progress-bar/styles.css";
import {connect} from 'react-redux';
import * as actions from '../action/index';
import HeaderSlide from '../components/HeaderSlide';
class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            name: '',
            address: '',
            phone: '',
            isSaveAddress: false,
            indexAddress: -1,
            paySuccess: false
        }
    }

    componentDidMount() {
        this.props.getAddressUser();
    }

    handleOnChange = (e) => {
        let {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleAddAddress = () => {
        let {name, address, phone} = this.state;
        this.props.addAddress({name: name, address: address, phone: phone});
    }

    handleSaveAddress = (index, isLogin) => {
        if(isLogin) {
            this.setState({
                isSaveAddress: true,
                indexAddress: index,
                paySuccess:true
            })
            let newCarts = this.props.carts;
            newCarts.forEach(cartItem => {
                this.props.removeFromCart(cartItem.id, cartItem.slug);
            })
        }
        else alert('You must login first to continue!');
    }

    hanleRemoveSingleAddress = (id) => {
        this.props.removeSingleAddress(id);
    }

    render() {
        let {address} = this.props;
        let {isLogin} = this.props.login;
        let {isSaveAddress, indexAddress, paySuccess} = this.state;
        let percent = 0;
        if(isLogin) percent = 50;
        if(isSaveAddress) percent = 100;
        let newAddress = address.map((elm, index) => (
            <li key={index} className='addressItem'>
                <h3>{elm.name}</h3>
                <p>Address: {elm.address}</p>
                <p>Phone number: {elm.phonenumber}</p>
                <button type='button' className={indexAddress === index ? 'btn saveAddress active' : 'btn saveAddress'} 
                        onClick={() => this.handleSaveAddress(index, isLogin)}>Use this address</button>
                <button className="btn btn-secondary cancelAddress" 
                        onClick={() => this.hanleRemoveSingleAddress(elm.id)}>
                        Remove
                </button>
            </li>
        ))
        return (
            <>
            <HeaderSlide />
            <div className='checkout container'>
                <ProgressBar percent={percent}>
                    <Step>
                        {({ accomplished, index }) => (
                            <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                               <p>{index + 1}</p> 
                               <h3 className='font-italic'>Login</h3>  
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => (
                            <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                                <p>{index + 1}</p> 
                                <h3 className='font-italic'>Address</h3>
                                    
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => (
                            <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                                <p>{index + 1}</p> 
                                <h3 className='font-italic'>Payment</h3>
                            </div>
                        )}
                    </Step>
                </ProgressBar>
                {paySuccess ? <h2 className='checkout-success'>Thank you for payment. Have a good day !</h2> : (
                <div className='checkout-address'>
                    <h2 className={isLogin ? 'hide' : 'checkout-login'}>Bạn cần đăng nhập để tiếp tục !</h2>
                    <div className={isLogin ? "checkout-address-add" : "hide"}>
                        <h2 className={address.length ? "" : "hide"}>Choose your address below:</h2>
                        <ul className="addressList">
                            {newAddress}
                        </ul>
                        <button type="button" className="btn btn-addNewAddress" data-toggle="modal" data-target="#modalAddress">
                            Add new address
                        </button>
                        <div class="modal fade" id="modalAddress" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form className='addressForm'>
                                            <div class="form-group mb-4">
                                                <label for="name">Name</label>
                                                <input type="text" class="form-control mt-3" id="name" name='name'
                                                    placeholder="Enter your name" onChange={this.handleOnChange} required />
                                            </div>
                                            <div class="form-group mb-4">
                                                <label for="address">Address</label>
                                                <textarea type="text" class="form-control mt-3" id="address" name='address'
                                                    placeholder="Enter your address" onChange={this.handleOnChange} required />
                                            </div>
                                            <div class="form-group mb-4">
                                                <label for="phone">Phone number</label>
                                                <input type="tel" class="form-control mt-3" id="phone" name='phone'
                                                    placeholder="Enter your phone number" onChange={this.handleOnChange} required />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary cancelAddress" data-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn saveAddress" onClick={this.handleAddAddress} data-dismiss="modal">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            </>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        login: state.isLogin,
        carts: state.cartReducer,
        address: state.addressUser
    }
}

const mapDispatchToState = (dispatch, props) => {
    return {
        getAddressUser: () => {
            dispatch(actions.fetchAddressUserRequest());
        },
        addAddress: (address) => {
            dispatch(actions.addAddressUser(address));
        },
        removeSingleAddress: (id) => {
            dispatch(actions.removeSingleAddressUser(id));
        },
        removeFromCart: (id, slug) => {
            dispatch(actions.removeFromCart(id, slug));
        }
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Checkout);


