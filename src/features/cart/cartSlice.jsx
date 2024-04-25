import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";
const url = "https://www.course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};
export const getCartItem = createAsyncThunk(
  "/cart/getCartItem",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      //   console.log(thunkAPI.getState());
      //     thunkAPI.dispatch(openModal());
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      const increaseAmount = state.cartItems.find(
        (item) => item.id === action.payload
      );
      increaseAmount.amount = increaseAmount.amount + 1;
    },
    decrease: (state, action) => {
      const decreaseAmount = state.cartItems.find(
        (item) => item.id === action.payload
      );
      decreaseAmount.amount <= 0
        ? (decreaseAmount.amount = 0)
        : (decreaseAmount.amount = decreaseAmount.amount - 1);
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItem.rejected, (state, action) => {
        // console.log(action);
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
