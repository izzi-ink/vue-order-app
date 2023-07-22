<!-- src/App.vue -->
<template>
  <div class="container mt-5">
    <h2>Available Items</h2>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="item in items" :key="item.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">Price: ${{ item.price }}</p>
            <button class="btn btn-primary" @click="addToOrder(item)">Add to Order</button>
          </div>
        </div>
      </div>
    </div>

    <h2>Order</h2>
    <div class="row">
      <div class="col-md-4 mb-3"  v-for="(item, index) in order" :key="index">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p>{{ item.name }} - ${{ item.price }}</p>
            
   
    <button class="btn btn-danger btn-sm" @click="removeItem(index)">Remove</button>
  
          </div>
        </div>
      </div>
    </div>

    <p>Total Order Price: ${{ totalOrderPrice }}</p>
    <button class="btn btn-success" @click="placeOrder">Place Order</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    items() {
      return this.$store.state.items;
    },
    order() {
      return this.$store.state.order;
    },
    totalOrderPrice() {
      return this.$store.getters.totalOrderPrice;
    },
  },
  methods: {
    addToOrder(item) {
      this.$store.commit('addToOrder', item);
    },
    removeFromOrder(itemId) {
      this.$store.commit('removeFromOrder', itemId);
    },
    removeItem(index) {
      this.order.splice(index, 1); // Remove the item at the specified index
    },
    placeOrder() {
      // Prepare the order data to send to the backend
      const orderData = {
        items: this.order,
        totalOrderPrice: this.totalOrderPrice,
      };

      // Replace 'http://localhost:3000' with the actual backend server URL
      const backendUrl = 'http://localhost:3000/place-order';

      // Make the API call to the backend using Axios
      axios
        .post(backendUrl, orderData)
        .then(response => {
          // Success handling, show a confirmation message
          alert(response.data.message);
          this.$store.state.order = []; // Clear the order after placing it
        })
        .catch(error => {
          // Error handling, show an error message
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again.');
        });
    },
  },
};
</script>





