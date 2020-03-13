<template>
  <div class="container">
    <h1 class="mt-3 mb-5">My profile</h1>
    <div class="row">
      <div class="col-12 col-lg-12">
        <ul class="list-group">
          <li class="list-group-item">
            <strong>ID:</strong>
            {{user._id}}
          </li>
          <li class="list-group-item">
            <strong>Name:</strong>
            {{user.name}}
          </li>
          <li class="list-group-item">
            <strong>Username:</strong>
            {{user.username}}
          </li>
          <li class="list-group-item">
            <strong>Email:</strong>
            {{user.email}}
          </li>
          <li class="list-group-item">
            <strong>Date Registered:</strong>
            {{String(user.date).split('T')[0]}}
          </li>
        </ul>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 my-2">
        <h2>My Products</h2>
      </div>

      <div class="col-12">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in userProducts" :key="product._id">
              <td>{{product.name}}</td>
              <td>{{product.description}}</td>
              <td>{{product.price}}</td>
              <td>{{product.category}}</td>
              <td>
                  <router-link class="btn btn-link" :to="'/product/edit/'+product._id">Edit</router-link>
                  <button class="btn btn-link" @click="productDelete(product._id)">Delete</button>
                  <router-link class="btn btn-link" :to="{name: 'specificProduct', params: {id: product._id} }">View</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['user', 'products']),
    userProducts() {
      return this.products.filter(p => {
        return p.userID == this.user._id;
      })
    }
  },
  methods: {
    ...mapActions(['getProfile', 'fetchProducts', 'deleteProduct']),
    productDelete(id) {
      const answer = confirm("Are you sure you want to delete this");
      if(answer) {
        this.deleteProduct(id);
      }
    }
  },
  filters: {
    
  },
  created() {
    this.getProfile();
    this.fetchProducts();
  }
}
</script>

<style scoped>
li {
  font-size: 1.2rem;
}

.container {
  min-height: 60vh;
}
</style>
