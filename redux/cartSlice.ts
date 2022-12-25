import { createSlice } from '@reduxjs/toolkit';
import { OptionType, PizzaType } from '../pages';

interface ProductsEachType extends PizzaType {
  extras: Array<OptionType>;
  price: number;
  quantity: number;
}

type ProductStateType = {
  products: Array<ProductsEachType>;
  quantity: number;
  total: number;
};

const initialState: ProductStateType = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export type { ProductStateType };
export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
