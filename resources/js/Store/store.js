import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        foodCart: [],
        beverageCart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { category, id, price, name } = action.payload;
            if (category === "foodCart") {
                const existingItem = state[category].find(
                    (item) => item.id === id
                );
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state[category].push({
                        id,
                        quantity: 1,
                        price: price,
                        product_name: name,
                    });
                }
            } else {
                const existingItem = state[category].find(
                    (item) => item.id === id
                );
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state[category].push({
                        id,
                        quantity: 1,
                        price: price,
                        beverage_name: name,
                    });
                }
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
        reset: (state) => {
            state.foodCart = [];
            state.beverageCart = [];
        },
    },
});

export const { addToCart, removeFromCart, reset } = cartSlice.actions;

const cartReducer = {
    cart: cartSlice.reducer,
};

const store = configureStore({
    reducer: cartReducer,
});

export default store;
