import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
  const dispatch = useDispatch();
  const editItem = useSelector((store) => store.edit.editItem);
  const history = useHistory();

  const handleChange = (event, prop) => {
    //console.log(event, prop);

    // Every change is stored in the redux store
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: prop, value: event },
    });
  }; // end handleChange

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // sends item from store to server to update db
    axios
      .put(`/api/shelf/${editItem.id}`, editItem)
      .then((res) => {
        // Clear redux store
        dispatch({ type: 'CLEAR_EDIT' });

        // Sends user back to the shelf
        history.push('/shelf');
      })
      .catch((err) => {
        console.log('Error in update', err);
      });
  }; // end handleSubmit

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
