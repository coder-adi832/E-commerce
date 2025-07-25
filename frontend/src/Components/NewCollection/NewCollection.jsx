import React, { useEffect, useState } from 'react';
import Item from '../Items/Item';
import './NewCollection.css'
import axios from 'axios';

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const res = await axios.get('http://localhost:4000/newcollections');
        setNewCollection(res.data);
        console.log('Fetched new collections:', res.data);
      } catch (error) {
        console.error('Error fetching new collections:', error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.length > 0 ? (
          newCollection.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>Loading new collections...</p>
        )}
      </div>
    </div>
  );
};

export default NewCollection;
