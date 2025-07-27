import React, { Suspense, lazy } from 'react';
import './CSS/Loader.css'; // Custom spinner styles

// Lazy-loaded components
const Hero = lazy(() => import('../Components/Hero/Hero'));
const Popular = lazy(() => import('../Components/Popular/Popular'));
const Offer = lazy(() => import('../Components/Offers/Offer'));
const NewCollection = lazy(() => import('../Components/NewCollection/NewCollection'));
const NewsLetter = lazy(() => import('../Components/NewsLetter/NewsLetter'));

// Reusable spinner
const Spinner = ({ label }) => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading {label}...</p>
  </div>
);

const Shop = () => {
  return (
    <div>
      <Suspense fallback={<Spinner label="Hero" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<Spinner label="Popular" />}>
        <Popular />
      </Suspense>

      <Suspense fallback={<Spinner label="Offer" />}>
        <Offer />
      </Suspense>

      <Suspense fallback={<Spinner label="New Collection" />}>
        <NewCollection />
      </Suspense>

      <Suspense fallback={<Spinner label="Newsletter" />}>
        <NewsLetter />
      </Suspense>
    </div>
  );
};

export default Shop;
