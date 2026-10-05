import React from 'react';
import { Trash2 } from 'lucide-react';
import { handleKeyDown, handlePaste, handleWheel, formatCOP } from '../utils/validations';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalCompra,
  totalUnidades
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Carrito de Compras</h3>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-msg">El carrito está vacío</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.nombre}</h4>
                  <p>{formatCOP(item.precio)}</p>
                </div>

                <div className="item-controls">
                  <button onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}>-</button>
                  <input
                    type="number"
                    value={item.cantidad}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onWheel={handleWheel}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                  />
                  <button onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}>+</button>
                </div>

                <div className="item-subtotal">
                  <span>Subtotal: {formatCOP(item.precio * item.cantidad)}</span>
                  <button onClick={() => onRemoveItem(item.id)} className="btn-delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="drawer-footer">
          <p>Total unidades: <strong>{totalUnidades}</strong></p>
          <h3>Total: {formatCOP(totalCompra)}</h3>
        </div>
      </div>
    </div>
  );
}