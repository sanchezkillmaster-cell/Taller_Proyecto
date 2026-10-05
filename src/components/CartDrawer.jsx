import React from 'react';

export const CartDrawer = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem, total }) => {
    if (!isOpen) return null;

    const totalPagar = total !== undefined
        ? total
        : cartItems.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 0), 0);

    const totalUnidades = cartItems.reduce((acc, item) => acc + (item.cantidad || 0), 0);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'flex-end'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    width: '350px',
                    maxWidth: '100%',
                    height: '100%',
                    backgroundColor: '#ffffff',
                    boxShadow: '-2px 0 10px rgba(0,0,0,0.15)',
                    padding: '20px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Encabezado */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Carrito de Compras</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </div>

                {/* Productos */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>El carrito está vacío</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{ fontSize: '0.95rem' }}>{item.nombre}</strong>
                                    <button onClick={() => onRemoveItem && onRemoveItem(item.id)} style={{ color: '#e53e3e', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>🗑️</button>
                                </div>
                                <p style={{ margin: '4px 0', color: '#4a5568' }}>${(item.precio || 0).toLocaleString('es-CO')}</p>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                                    <button onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.cantidad - 1)} style={{ width: '28px', height: '28px', cursor: 'pointer' }}>-</button>
                                    <span style={{ fontWeight: 'bold', padding: '0 4px' }}>{item.cantidad}</span>
                                    <button onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.cantidad + 1)} style={{ width: '28px', height: '28px', cursor: 'pointer' }}>+</button>
                                </div>
                                <p style={{ marginTop: '6px', fontSize: '0.85em', color: '#718096', margin: '6px 0 0 0' }}>
                                    Subtotal: ${((item.precio || 0) * (item.cantidad || 0)).toLocaleString('es-CO')}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* Pie con totales */}
                <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '2px solid #edf2f7' }}>
                    <p style={{ margin: '0 0 8px 0', color: '#4a5568' }}>Total unidades: {totalUnidades}</p>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2d3748' }}>Total: ${totalPagar.toLocaleString('es-CO')}</h3>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;