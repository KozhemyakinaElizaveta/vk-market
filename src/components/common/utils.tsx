import { RootState } from '../../services/store';

export const priceFormat = (price: number): string => {
    const formatedPrice = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(price);
    return formatedPrice;
};

export const totalPriceSelector = (state: RootState): number => {
    const {
        cart: { items },
        delivery: { deliveryMethods, selectedDeliveryId }
    } = state;
    const deliveryPrice = (selectedDeliveryId && deliveryMethods.find(method => method.id === selectedDeliveryId)?.price) || 0;
    return deliveryPrice + items.reduce((acc, item) => acc + item.price * item.qty, 0);
};

