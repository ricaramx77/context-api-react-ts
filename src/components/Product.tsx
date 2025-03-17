import { JSX, useContext } from 'react';
import { CartContext, CartContextType } from '../store/shopping-cart-context';

// Definimos los tipos para las props del componente
interface ProductProps {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

export default function Product({ id, image, title, price, description }: ProductProps): JSX.Element {
  const { addItemToCart } = useContext(CartContext) as CartContextType;

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price.toFixed(2)}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
