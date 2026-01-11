'use client';
import { useCart } from './CartContext';

export default function CartList() {
  const { cart, addToCart, removeFromCart } = useCart();

  if (cart.length === 0) return <p>Tu carrito está vacío</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      {cart.map(item => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px'
          }}
        >
          {/* Info del producto */}
          <div>
            <strong>{item.name}</strong>
            <p>Precio unitario: ${item.price}</p>
          </div>

          {/* Contador individual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <button onClick={() => removeFromCart(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>

          {/* Subtotal por producto */}
          <div>
            <p>Subtotal: ${item.price * item.quantity}</p>
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px', textAlign: 'right' }}>
        <strong>Total: ${total}</strong>
      </div>
    </div>
  );
}
