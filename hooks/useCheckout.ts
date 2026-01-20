import { useState } from 'react';
import { createOrder, OrderData } from '../services/OrderService'; // Adjusted casing to match file creation
import { useCart } from '../app/components/carcontext'; // Corrected path

export const useCheckout = () => {
    const { cart, total, clearCart } = useCart(); // Traemos datos del carrito
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);

    const handleCheckout = async (formData: { name: string; phone: string; email: string }) => {
        setLoading(true);

        // 1. Preparamos los datos para Laravel-
        const orderPayload: OrderData = {
            customer_name: formData.name,
            customer_phone: formData.phone,
            customer_email: formData.email,
            total: total,
            items: cart.map((item: any) => ({
                product_id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        };

        try {
            // 2. Guardamos en Base de Datos (Backend)
            const newOrder = await createOrder(orderPayload);
            setOrderId(newOrder.id);

            // 3. Generamos el mensaje de WhatsApp
            const whatsappMessage = generateWhatsappMessage(newOrder.id, formData.name, cart, total);

            // 4. Abrimos WhatsApp
            const whatsappUrl = `https://wa.me/593999999999?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            // 5. Limpiamos el carrito local
            clearCart();

            return true; // Éxito
        } catch (error) {
            alert("Hubo un error al procesar tu pedido. Inténtalo de nuevo.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Función auxiliar para crear el texto bonito
    const generateWhatsappMessage = (id: number, name: string, items: any[], total: number) => {
        let msg = `👋 Hola JLC Tecnología, soy *${name}*.\n`;
        msg += `Acabo de realizar el pedido *#${id}* en la web.\n\n`;
        msg += `📝 *Detalle del pedido:*\n`;

        items.forEach(item => {
            msg += `▪️ ${item.quantity} x ${item.name} ($${item.price})\n`;
        });

        msg += `\n💰 *TOTAL: $${total.toFixed(2)}*\n`;
        msg += `\nQuedo atento a los datos bancarios para transferir.`;
        return msg;
    };

    return {
        handleCheckout,
        loading,
        orderId // Lo necesitamos para el botón de descargar PDF
    };
};
