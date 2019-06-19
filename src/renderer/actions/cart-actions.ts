export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(product: any, quantity: any, unitCost: any) {
    return {
        type: ADD_TO_CART,
        payload: { product, quantity, unitCost },
    };
}

export function updateCart(product: any, quantity: any, unitCost: any) {
    return {
        type: UPDATE_CART,
        payload: {
            product,
            quantity,
            unitCost,
        },
    };
}

export function deleteFromCart(product: any) {
    return {
        type: DELETE_FROM_CART,
        payload: {
            product,
        },
    };
}
