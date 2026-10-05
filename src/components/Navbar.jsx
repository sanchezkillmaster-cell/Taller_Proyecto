import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function Navbar({ totalUnidades, onOpenCart }) {
  return (
    <nav className="navbar">
      <h2>TIENDA PALMIRA</h2>
      <button className="cart-icon-btn" onClick={onOpenCart}>
        <ShoppingCart size={26} />
        {totalUnidades > 0 && (
          <span className="cart-badge">{totalUnidades}</span>
        )}
      </button>
    </nav>
  );
}