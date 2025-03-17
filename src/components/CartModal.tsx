import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Cart from './Cart';

// Definimos los tipos para las props del componente
interface CartModalProps {
  title: string;
  actions: ReactNode; // Permite cualquier nodo React (botones, texto, etc.)
}

// Definimos los métodos que serán expuestos mediante `useImperativeHandle`
export interface CartModalHandle {
  open: () => void;
}

const CartModal = forwardRef<CartModalHandle, CartModalProps>(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
  }));

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal') as HTMLElement 
  );
});

export default CartModal;
