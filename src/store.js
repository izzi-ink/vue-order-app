// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    items: [
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 20 },
      // Add more items as needed
    ],
    order: [],
  },
  mutations: {
    addToOrder(state, item) {
      state.order.push(item);
    },
    removeFromOrder(state, itemId) {
      state.order = state.order.filter(item => item.id !== itemId);
    },
  },
  getters: {
    totalOrderPrice(state) {
      return state.order.reduce((total, item) => total + item.price, 0);
    },
  },
});
