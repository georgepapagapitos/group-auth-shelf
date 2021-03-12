import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function EditPage() {
  const dispatch = useDispatch();
  const editItem = useSelector((store) => store.edit.editItem);
  const history = useHistory();

  const handleChange = (event, prop) => {
    console.log(event, prop);

    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: prop, value: event },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.put(``);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editItem.description}
          onChange={(evt) => handleChange(evt.target.value, 'description')}
        />

        <input
          type="text"
          value={editItem.image_url}
          onChange={(evt) => handleChange(evt.target.value, 'image_url')}
        />

        <button>Update</button>
      </form>
    </div>
  );
}

export default EditPage;
