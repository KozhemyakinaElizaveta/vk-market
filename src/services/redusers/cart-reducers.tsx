import {
    DELETE_ITEM,
    CANCEL_PROMO,
    DECREASE_ITEM,
    INCREASE_ITEM,
    ADD_ITEM,
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    APPLY_PROMO_FAILED,
    APPLY_PROMO_REQUEST,
    APPLY_PROMO_SUCCESS,
    TAB_SWITCH,
    GET_RECOMMENDED_ITEMS_FAILED,
    GET_RECOMMENDED_ITEMS_REQUEST,
    GET_RECOMMENDED_ITEMS_SUCCESS,
    ADD_POSTPONED_ITEM,
    DELETE_POSTPONED_ITEM,
} from '../actions/cart-actions';

export interface CartItem {
    id: number;
    src: string;
    qty: number;
    text: string;
    price: number;
}

export interface TAction {
    type: string;
    id?: number;
    code?: string;
    items?: CartItem[];
    value?: {
        code: string;
        discount: number | null;
    };
}

export interface CartState {
    featured: any[];
    postponed: any[];

    items: CartItem[];
    itemsRequest: boolean;
    itemsFailed: boolean;

    recommendedItems: CartItem[];
    recommendedItemsRequest: boolean;
    recommendedItemsFailed: boolean;

    postponedItems: CartItem[];

    promoCode: string;
    promoDiscount: number | null;
    promoRequest: boolean;
    promoFailed: boolean;

    currentTab: string;
}

const initialState: CartState = {
    featured: [],
    postponed: [],

    items: [],
    itemsRequest: false,
    itemsFailed: false,

    recommendedItems: [],
    recommendedItemsRequest: false,
    recommendedItemsFailed: false,

    postponedItems: [],

    promoCode: '',
    promoDiscount: null,
    promoRequest: false,
    promoFailed: false,

    currentTab: 'items',
};

export const cartReducer = (state: CartState = initialState, action: TAction) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
            };
        }
        case GET_ITEMS_SUCCESS: {
            return { ...state, itemsFailed: false, items: action.items!, itemsRequest: false };
        }
        case GET_ITEMS_FAILED: {
            return { ...state, itemsFailed: true, itemsRequest: false };
        }

        case GET_RECOMMENDED_ITEMS_REQUEST: {
            return {
                ...state,
                recommendedItemsRequest: true,
            };
        }
        case GET_RECOMMENDED_ITEMS_SUCCESS: {
            return {
                ...state,
                recommendedItemsFailed: false,
                recommendedItems: action.items!,
                recommendedItemsRequest: false,
            };
        }
        case GET_RECOMMENDED_ITEMS_FAILED: {
            return { ...state, recommendedItemsFailed: true, recommendedItemsRequest: false };
        }

        case TAB_SWITCH: {
            return {
                ...state,
                currentTab: state.currentTab === 'items' ? 'postponed' : 'items',
            };
        }
        case INCREASE_ITEM: {
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.id ? { ...item, qty: ++item.qty } : item
                ),
            };
        }
        case DECREASE_ITEM: {
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.id ? { ...item, qty: --item.qty } : item
                ),
            };
        }
        case DELETE_ITEM: {
            return { ...state, items: state.items.filter((item) => item.id !== action.id) };
        }
        case ADD_ITEM: {
            return {
                ...state,
                items: [...state.items, ...state.postponed.filter((item) => item.id === action.id)],
            };
        }
        case APPLY_PROMO_FAILED: {
            return {
                ...state,
                promoRequest: false,
                promoFailed: true,
                promoDiscount: null,
                promoCode: '',
            };
        }
        case APPLY_PROMO_REQUEST: {
            return {
                ...state,
                promoFailed: false,
                promoRequest: true,
            };
        }
        case APPLY_PROMO_SUCCESS: {
            return {
                ...state,
                promoRequest: false,
                promoCode: action.value!.code,
                promoDiscount: action.value!.discount,
            };
        }
        case CANCEL_PROMO: {
            return {
                ...state,
                promoCode: '',
                promoDiscount: null,
            };
        }
        case ADD_POSTPONED_ITEM: {
            return {
                ...state,
                postponed: [...state.postponed, ...state.items.filter((item) => item.id === action.id)],
            };
        }
        case DELETE_POSTPONED_ITEM: {
            return { ...state, postponed: [...state.postponed].filter((item) => item.id !== action.id) };
        }
        default: {
            return state;
        }
    }
};
