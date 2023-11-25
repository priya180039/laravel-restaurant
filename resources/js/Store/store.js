import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        foodCart: [],
        drinkCart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { category, id, price, product_name } = action.payload;
            const existingItem = state[category].find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state[category].push({
                    id,
                    quantity: 1,
                    price: price,
                    product_name: product_name,
                });
            }
        },
        removeFromCart: (state, action) => {
            const { category, id } = action.payload;
            const existingItem = state[category].find((item) => item.id === id);
            if (existingItem.quantity === 1) {
                state[category] = state[category].filter(
                    (item) => item.id !== id
                );
            } else {
                existingItem.quantity -= 1;
            }
        },
        // removeFromCart: (state) => {
        //     state.foodCart -= 1;
        // },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

const cartReducer = {
    cart: cartSlice.reducer,
};

const store = configureStore({
    reducer: cartReducer,
});

export default store;
