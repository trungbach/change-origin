import axios from 'axios';

const urlApiProducts = 'https://5fee29939708250017ce41af.mockapi.io/api/ananas';
const urlApiCarts = 'https://5fee29939708250017ce41af.mockapi.io/api/carts';
const urlApiAddress = 'https://5fee29939708250017ce41af.mockapi.io/api/address';
const urlApiFavorite = 'https://6051eaa8fb49dc00175b71a3.mockapi.io/api/favorite';

export const callAPIProducts = () => {
    return axios.get(urlApiProducts);
}

export const callAPICarts = () => {
    return axios.get(urlApiCarts);
}

export const callAPIAddress = () => {
    return axios.get(urlApiAddress);
}

export const callAPIFavorite = () => {
    return axios.get(urlApiFavorite);
}

export const callAPIToHandleCart = (type, cartItem, id) => {
    switch(type) {
        case 'post':
            axios({
                method: 'post',
                url: urlApiCarts,
                data: cartItem
            });
            break;
        case 'delete': 
            axios.delete(`${urlApiCarts}/${id}`)
                 .catch(error => console.log(error));
            break;
        case 'patch':
            axios.patch(`${urlApiCarts}/${id}`,
                    {...cartItem}
                   
            );
        default: break;
    }
}

export const callAPIToHandleAddress = (type, address, id) => {
    switch(type) {
        case 'post': 
            axios({
                method: 'post',
                url: urlApiAddress,
                data: address
            });
            break;
        case 'delete': 
            axios.delete(`${urlApiAddress}/${id}`)
                .catch(error => console.log(error));
            break;
        default: break;

    }
}

export const callAPIToHandleFavorite = (type, favorite, id) => {
    switch(type) {
        case 'post': 
            axios({
                method: 'post',
                url: urlApiFavorite,
                data: favorite
            });
            break;
        case 'delete': 
            axios.delete(`${urlApiFavorite}/${id}`)
                .catch(error => console.log(error));
            break;
        default: break;

    }
}


