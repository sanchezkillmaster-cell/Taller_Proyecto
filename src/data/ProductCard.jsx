import React, { useState } from 'react';
import { formatCOP, handleKeyDown, handlePaste, handleWheel } from '../utils/validations';

export function ProductCard({ producto, onAddToCart, showToast }) {
    const [cantidadInput, setCantidadInput] = useState(1);

    const handleInputChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setCantidadInput('');
            return;
        }
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 1) {
            setCantidadInput(num);
        }
    };

    const handleAdd = () => {
        const cantidad = cantidadInput === '' ? 1 : cantidadInput;
        if (cantidad > producto.stock) {
            showToast("Este es el máximo de producto disponible en stock");
            onAddToCart(producto, producto.stock);
        } else {
            onAddToCart(producto, cantidad);
        }
        setCantidadInput(1);
    };

    const isOutOfStock = producto.stock === 0;

    return (
        <div className="product-card">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="product-image"
            />
            <h3>{producto.nombre}</h3>
            <p className="price">{formatCOP(producto.precio)}</p>
            <p className="stock">
                {isOutOfStock ? "Agotado" : `Stock disponible: ${producto.stock}`}
            </p>

            <div className="card-actions">
                <input
                    type="number"
                    min="1"
                    max={producto.stock}
                    value={cantidadInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onWheel={handleWheel}
                    disabled={isOutOfStock}
                />
                <button
                    className="btn-add"
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? "Agotado" : "Agregar"}
                </button>
            </div>
        </div>
    );
}