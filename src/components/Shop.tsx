import { JSX, ReactNode } from 'react';

interface ShopProps {
  children: ReactNode; // Permite cualquier tipo de contenido React válido como hijos
}

export default function Shop({ children }: ShopProps): JSX.Element {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  );
}
