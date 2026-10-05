export const handleKeyDown = (e) => {
  if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
    e.preventDefault();
  }
};

export const handlePaste = (e) => {
  const pasteData = e.clipboardData.getData('text');
  if (!/^\d+$/.test(pasteData)) {
    e.preventDefault();
  }
};

export const handleWheel = (e) => {
  e.target.blur();
};

export const formatCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor);
};