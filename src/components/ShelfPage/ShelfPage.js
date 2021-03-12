import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ShelfPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [items, setItems] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

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
  }; // end getItems

  function handleSubmit(evt) {
    evt.preventDefault();

    const newItem = {
      description: newDescription,
      image_url: newImage,
    };

    axios
      .post('/api/shelf/', newItem)
      .then((res) => {
        getItems();

        setNewDescription('');
        setNewImage('');
      })
      .catch((err) => {
        console.log('Error in post', err);
      });
  } // end handleSubmit

  const deleteButton = (itemId) => {
    console.log('item id', itemId);

    axios
      .delete(`/api/shelf/${itemId}`)
      .then((res) => {
        getItems();
      })
      .catch((err) => {
        console.log('Error in delete', err);
      });
  }; // end deleteButton

  const editButton = (item) => {
    console.log('item to edit', item);

    dispatch({
      type: 'SET_EDIT_ITEM',
      payload: item,
    });

    history.push('/edit');
  }; // end editButton

  return (
    <div className="container">
      <h2>Shelf</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={newImage}
          onChange={(event) => setNewImage(event.target.value)}
        />

        <button>Submit</button>
      </form>

      <div className="item-container">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.image_url} alt={item.description} />
              <p>{item.description}</p>
              <p>
                <button onClick={() => deleteButton(item.id)}>Delete</button>
              </p>
              <p>
                <button onClick={() => editButton(item)}>Edit</button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShelfPage;
