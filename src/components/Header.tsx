import React, { JSX, useContext, useRef } from 'react';
import { CartContext, CartContextType } from '../store/shopping-cart-context'; // Aseguramos que el contexto esté tipado
import CartModal, { CartModalHandle } from './CartModal'; // Importamos el tipo de referencia definido en CartModal

export default function Header(): JSX.Element {
  const modal = useRef<CartModalHandle>(null); // Tipamos la referencia para que utilice `CartModalHandle`
  const { items } = useContext(CartContext) as CartContextType; // Tipamos el contexto como `CartContextType`

  const cartQuantity = items.length;

  function handleOpenCartClick(): void {
    modal.current?.open(); // Usamos el operador opcional para evitar errores si `modal.current` es nulo
  }

  let modalActions: React.ReactNode = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
