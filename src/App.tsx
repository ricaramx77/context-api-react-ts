import { JSX } from 'react';
import Header from './components/Header';
import Product from './components/Product';
import Shop from './components/Shop';
import { DUMMY_PRODUCTS } from './dummy-products';
import CartContextProvider from './store/shopping-cart-context';

// Definimos el tipo de los productos para tipar `DUMMY_PRODUCTS`
export interface ProductType {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

function App(): JSX.Element {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product: ProductType) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
