import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ShelfPage() {
  const [items, setItems] = useState([]);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    axios
      .get('/api/shelf/')
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log('Error in GET', err);
      });
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      <div className="item-container">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.image_url} alt={item.description} />
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShelfPage;
