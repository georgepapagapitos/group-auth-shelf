import { combineReducers } from 'redux';

const defaultItem = {
  description: '',
  image_url: '',
  user_id: '',
};

const editItem = (state = defaultItem, action) => {
  switch (action.type) {
    case 'SET_EDIT_ITEM':
      return action.payload;
    case 'EDIT_ONCHANGE':
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    case 'CLEAR_EDIT':
      return defaultItem;
    default:
      return state;
  }
};
export default combineReducers({
  editItem,
});
