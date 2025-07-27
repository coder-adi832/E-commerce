import React, { useContext, Suspense, lazy } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import './CSS/Loader.css'; // Spinner CSS

// Lazy imports
const Breadcrums = lazy(() => import('../Components/Breadcrums/Breadcrums'));
const ProductDisplay = lazy(() => import('../Components/ProductDisplay/ProductDisplay'));
const DescriptionBox = lazy(() => import('../Components/DescriptionBox/DescriptionBox'));
const RelatedProducts = lazy(() => import('../Components/RelatedProducts/RelatedProducts'));

// Spinner component
const Spinner = ({ label }) => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading {label}...</p>
  </div>
);

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productID } = useParams();
  const product = all_product.find((e) => e.id === Number(productID));

  return (
    <div className="">
      <Suspense fallback={<Spinner label="Breadcrumbs" />}>
        <Breadcrums product={product} />
      </Suspense>

      <Suspense fallback={<Spinner label="Product Details" />}>
        <ProductDisplay product={product} />
      </Suspense>

      <Suspense fallback={<Spinner label="Description" />}>
        <DescriptionBox />
      </Suspense>

      <Suspense fallback={<Spinner label="Related Products" />}>
        <RelatedProducts />
      </Suspense>
    </div>
  );
};

export default Product;
