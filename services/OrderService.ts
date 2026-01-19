// services/orderService.ts
import axios from 'axios';

const API_URL = "https://api.jlctecnology.com/api";

export interface OrderData {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    total: number;
    items: Array<{
        product_id: number;
        name: string;
        price: number;
        quantity: number;
    }>;
}

export const createOrder = async (orderData: OrderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data; // Devuelve la orden creada con su ID
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw error;
    }
};