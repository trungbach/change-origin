import React,{ useState, useEffect } from 'react';
import {ProgressBar, Step} from 'react-step-progress-bar';
import "react-step-progress-bar/styles.css";
import * as actions from '../action/index';
import HeaderSlide from '../components/Header/HeaderSlide';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {

    const [info, setInfo] = useState({ name: '', address: '', phone: '' });
    const [paySuccess, setPaySuccess] = useState(false);
    const [isSaveAddress, setIsSaveAddress] = useState(false);
    const [indexAddress, setIndexAddress] = useState(-1);
    const dispatch = useDispatch();
    const address = useSelector(state => state.addressUser);
    const carts = useSelector(state => state.cartReducer);

    useEffect(() => {
        dispatch(actions.fetchAddressUserRequest());
        dispatch(actions.fetchCartsRequest());
        dispatch(actions.getIsLogin());
    }, [dispatch]);

    const handleOnChange = (e) => {
        let {name, value} = e.target;
        setInfo({ ...info, [name]: value});
    }

    const handleSaveAddress = (index) => {
        if(JSON.parse(localStorage.getItem('profile'))) {
            setIsSaveAddress(true);
            setIndexAddress(index);
            setPaySuccess(true);
            let newCarts = carts;
            newCarts.forEach(cartItem =>  dispatch(actions.removeFromCart(cartItem.id, cartItem.slug)))
        }
        else alert('You must login first to continue!');
    }

    const hanleRemoveSingleAddress = (id) => {
        dispatch(actions.removeSingleAddressUser(id));
    }

    let percent = 0;
    if(JSON.parse(localStorage.getItem('profile'))) percent = 50;
    if(isSaveAddress) percent = 100;
    let newAddress = address.map((elm, index) => (
        <li key={index} className='addressItem'>
            <h3>{elm.name}</h3>
            <p>Address: {elm.address}</p>
            <p>Phone number: {elm.phonenumber}</p>
            <button type='button' className={indexAddress === index ? 'btn saveAddress active' : 'btn saveAddress'} 
                    onClick={() => handleSaveAddress(index)}>Use this address</button>
            <button className="btn btn-secondary cancelAddress" 
                    onClick={() => hanleRemoveSingleAddress(elm.id)}>
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
                <h2 className={JSON.parse(localStorage.getItem('profile')) ? 'hide' : 'checkout-login'}>Bạn cần đăng nhập để tiếp tục !</h2>
                <div className={JSON.parse(localStorage.getItem('profile')) ? "checkout-address-add" : "hide"}>
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
                                                placeholder="Enter your name" onChange={handleOnChange} required />
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="address">Address</label>
                                            <textarea type="text" class="form-control mt-3" id="address" name='address'
                                                placeholder="Enter your address" onChange={handleOnChange} required />
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="phone">Phone number</label>
                                            <input type="tel" class="form-control mt-3" id="phone" name='phone'
                                                placeholder="Enter your phone number" onChange={handleOnChange} required />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary cancelAddress" data-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn saveAddress" onClick={() => dispatch(actions.addAddressUser(info))} data-dismiss="modal">Save</button>
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

export default Checkout;


