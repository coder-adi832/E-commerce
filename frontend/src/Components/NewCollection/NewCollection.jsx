import React, { useEffect, useState, Suspense, lazy } from 'react';
import './NewCollection.css';
import axios from 'axios';
import '../../Pages/CSS/Loader.css';

const Item = lazy(() => import('../Items/Item'));

// Spinner component
const Spinner = ({ label }) => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading {label}...</p>
  </div>
);

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/newcollections`);
        setNewCollection(res.data);
      } catch (error) {
        console.error('Error fetching new collections:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {loadingData ? (
          <Spinner label="New Collections" />
        ) : (
          <Suspense fallback={<Spinner label="New Collection Items" />}>
            {newCollection.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))}
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default NewCollection;
