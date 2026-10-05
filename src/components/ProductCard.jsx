import React, { useState } from 'react';
import { handleKeyDown, handlePaste, handleWheel, formatCOP } from '../utils/validations';

export function ProductCard({ producto, onAddToCart, showToast }) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    onAddToCart(producto, cantidad);
    setCantidad(1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    if (val > producto.stock) {
      showToast("Este es el máximo de producto disponible en stock");
      setCantidad(producto.stock);
    } else if (val <= 0) {
      showToast("Cantidad mínima 1");
      setCantidad(1);
    } else {
      setCantidad(val);
    }
  };

  const isAgotado = producto.stock <= 0;

  return (
    <div className="product-card">
      <h3>{producto.nombre}</h3>
      <p className="price">{formatCOP(producto.precio)}</p>
      <p className="stock">Stock disponible: {producto.stock}</p>

      <div className="card-actions">
        <input
          type="number"
          min="1"
          max={producto.stock}
          value={cantidad}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onWheel={handleWheel}
          onChange={handleChange}
          disabled={isAgotado}
        />
        <button
          onClick={handleAgregar}
          disabled={isAgotado}
          className="btn-add"
        >
          {isAgotado ? 'Agotado' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}