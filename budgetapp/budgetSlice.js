import {createSlice} from '@reduxjs/toolkit';
// using async storage for a persistent store to save data
import AsyncStorage from '@react-native-async-storage/async-storage';

// initializing items to empty
const initialState = {
  items: [],
};

// registering the reducer to perform to add and set items onto the storage
export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      AsyncStorage.setItem('budgetItems', JSON.stringify(state.items));
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {addItem, setItems} = budgetSlice.actions;

// fetching items from the saved data
export const loadItems = () => async dispatch => {
  const items = await AsyncStorage.getItem('budgetItems');
  if (items) {
    dispatch(setItems(JSON.parse(items)));
  }
};

export default budgetSlice.reducer;
