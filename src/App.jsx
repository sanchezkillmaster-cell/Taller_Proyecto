import React, { useState } from 'react';
import { PRODUCTOS } from './data/productos';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import './App.css';

export function App() {
  const [productos] = useState(PRODUCTOS);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (producto, cantidadDeseada) => {
    const itemExistente = cartItems.find((item) => item.id === producto.id);
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
    const nuevaCantidad = cantidadActual + cantidadDeseada;

    if (nuevaCantidad > producto.stock) {
      showToast("Este es el máximo de producto disponible en stock");
      if (itemExistente) {
        setCartItems(cartItems.map(item =>
          item.id === producto.id ? { ...item, cantidad: producto.stock } : item
        ));
      } else {
        setCartItems([...cartItems, { ...producto, cantidad: producto.stock }]);
      }
    } else {
      if (itemExistente) {
        setCartItems(cartItems.map(item =>
          item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item
        ));
      } else {
        setCartItems([...cartItems, { ...producto, cantidad: cantidadDeseada }]);
      }
    }
  };

  const handleUpdateQuantity = (id, nuevaCantidad) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    if (nuevaCantidad > item.stock) {
      showToast("Este es el máximo de producto disponible en stock");
      setCartItems(cartItems.map(i => i.id === id ? { ...i, cantidad: item.stock } : i));
    } else if (nuevaCantidad <= 0 || (nuevaCantidad < item.cantidad && item.cantidad === 1)) {
      setConfirmDialog({
        id,
        mensaje: "Esta es la cantidad mínima. ¿Desea eliminar el producto?"
      });
    } else {
      setCartItems(cartItems.map(i => i.id === id ? { ...i, cantidad: nuevaCantidad } : i));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalUnidades = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalCompra = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="app-container">
      <Navbar totalUnidades={totalUnidades} onOpenCart={() => setIsCartOpen(true)} />

      {toast && (
        <div className="toast-notification">
          <span>{toast}</span>
          <button onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {confirmDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{confirmDialog.mensaje}</p>
            <div className="modal-buttons">
              <button onClick={() => {
                handleRemoveItem(confirmDialog.id);
                setConfirmDialog(null);
              }}>Eliminar</button>
              <button onClick={() => setConfirmDialog(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <main className="catalog-grid">
        {productos.map(producto => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        ))}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        totalCompra={totalCompra}
        totalUnidades={totalUnidades}
      />
    </div>
  );
}

export default App;