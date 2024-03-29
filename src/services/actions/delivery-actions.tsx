import { getDeliveryMethodsRequest } from '../fakeApi';
import { AppDispatch } from '../store';

export const GET_DELIVERY_METHODS = 'GET_DELIVERY_METHODS';
export const GET_DELIVERY_METHODS_FAILED = 'GET_DELIVERY_METHODS_FAILED';
export const GET_DELIVERY_METHODS_SUCCESS = 'GET_DELIVERY_METHODS_SUCCESS';

export const SET_DELIVERY_METHOD = 'SET_DELIVERY_METHOD';
export const SET_DELIVERY_FORM_VALUE = 'SET_DELIVERY_FORM_VALUE';

interface GetDeliveryMethodsAction {
    type: typeof GET_DELIVERY_METHODS;
}

interface GetDeliveryMethodsFailedAction {
    type: typeof GET_DELIVERY_METHODS_FAILED;
}

interface SetDeliveryFormValueAction {
    type: typeof SET_DELIVERY_FORM_VALUE;
    field: string;
    value: string;
}

interface SetDeliveryMethodAction {
    type: typeof SET_DELIVERY_METHOD;
    id: string;
}

interface GetDeliveryMethodsSuccessAction {
    type: typeof GET_DELIVERY_METHODS_SUCCESS;
    methods: any[];
}

export type TDeliveryAction =
    | GetDeliveryMethodsAction
    | GetDeliveryMethodsFailedAction
    | SetDeliveryFormValueAction
    | SetDeliveryMethodAction
    | GetDeliveryMethodsSuccessAction;

export function getRecommendedItems() {
    return function(dispatch: AppDispatch) {
        dispatch({
        type: GET_DELIVERY_METHODS
        });
        getDeliveryMethodsRequest().then(res => {
        if (res && res.success) {
            dispatch({
            type: GET_DELIVERY_METHODS_SUCCESS,
            methods: res.data
            });
        } else {
            dispatch({
            type: GET_DELIVERY_METHODS_FAILED
            });
        }
        });
    };
}