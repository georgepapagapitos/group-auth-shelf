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

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log('in submit');
  }

  return (
    <div className="container">
      <h2>Shelf</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Description" />

        <input type="text" placeholder="Image URL" />

        <button>Submit</button>
      </form>

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
