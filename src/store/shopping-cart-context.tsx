import { createContext, JSX, ReactNode, useState } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// Definimos los tipos para un elemento del carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Tipos para el estado del carrito
interface ShoppingCartState {
  items: CartItem[];
}

// Tipos para el contexto
export interface CartContextType {
  items: CartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
}

// Creamos el contexto y proporcionamos un valor inicial tipado
export const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

interface CartContextProviderProps {
  children: ReactNode; // Representa los elementos hijos de React
}

export default function CartContextProvider({ children }: CartContextProviderProps): JSX.Element {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartState>({
    items: [],
  });

  function handleAddItemToCart(id: string): void {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        if (product) {
          updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return { items: updatedItems };
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number): void {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = { ...updatedItems[updatedItemIndex] };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return { items: updatedItems };
    });
  }

  const ctxValue: CartContextType = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
