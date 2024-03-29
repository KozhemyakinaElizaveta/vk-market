import {
    applyPromoCodeRequest,
    getItemsRequest,
    getRecommendedItemsRequest,
} from '../fakeApi';
import { AppDispatch } from '../store';

export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_RECOMMENDED_ITEMS_REQUEST = 'GET_RECOMMENDED_ITEMS_REQUEST';
export const GET_RECOMMENDED_ITEMS_SUCCESS = 'GET_RECOMMENDED_ITEMS_SUCCESS';
export const GET_RECOMMENDED_ITEMS_FAILED = 'GET_RECOMMENDED_ITEMS_FAILED';

export const APPLY_PROMO_REQUEST = 'APPLY_PROMO_REQUEST';
export const APPLY_PROMO_SUCCESS = 'APPLY_PROMO_SUCCESS';
export const APPLY_PROMO_FAILED = 'APPLY_PROMO_FAILED';
export const CANCEL_PROMO = 'CANCEL_PROMO';

export const ADD_POSTPONED_ITEM = 'ADD_POSTPONED_ITEM';
export const DELETE_POSTPONED_ITEM = 'DELETE_POSTPONED_ITEM';

export const TAB_SWITCH = 'TAB_SWITCH';

export function applyPromo(code: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: APPLY_PROMO_REQUEST,
            code,
        });
        applyPromoCodeRequest(code).then((res: any) => {
            if (res && res.success) {
            dispatch({
                type: APPLY_PROMO_SUCCESS,
                value: { ...res, code },
            });
            } else {
            dispatch({
                type: APPLY_PROMO_FAILED,
            });
            }
        });
    };
}

export function getItems() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST,
        });
        getItemsRequest().then((res: any) => {
            if (res && res.success) {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                items: res.data,
            });
            } else {
            dispatch({
                type: GET_ITEMS_FAILED,
            });
            }
        });
    };
}

export function getRecommendedItems() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_RECOMMENDED_ITEMS_REQUEST,
        });
        getRecommendedItemsRequest().then((res: any) => {
            if (res && res.success) {
            dispatch({
                type: GET_RECOMMENDED_ITEMS_SUCCESS,
                items: res.data,
            });
            } else {
            dispatch({
                type: GET_RECOMMENDED_ITEMS_FAILED,
            });
            }
        });
    };
}