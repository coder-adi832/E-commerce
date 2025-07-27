import React, { useContext, Suspense, lazy } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/Frontend_Assets/dropdown_icon.png';
import './CSS/Loader.css'; // spinner style

const Item = lazy(() => import('../Components/Items/Item'));

// Reusable spinner
const Spinner = ({ label }) => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading {label}...</p>
  </div>
);

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="sub-category">
      <img className="shop-category-banner" src={props.banner} alt="" />

      <div className="shop-category-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shop-category-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shop-category-products">
        <Suspense fallback={<Spinner label="Products" />}>
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </Suspense>
      </div>

      <div className="shop-category-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
