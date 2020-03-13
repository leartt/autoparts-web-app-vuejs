<template>
  <div class="container">
    <div v-if="!loading">
      <h2 class="my-4">Specific Product Details</h2>
      <div class="row d-flex">
        <div class="col-12 col-lg-6">
          <div class>
            <img class :src="'http://localhost:5500/' + product.productImage" alt="..." />
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <ul class="list-group">
            <li class="list-group-item">
              <h2>{{product.name}}</h2>
            </li>
            <li class="list-group-item">
              <strong>Description:</strong>
              {{product.description}}
            </li>
            <li class="list-group-item">
              <strong>Category:</strong>
              {{product.category}}
            </li>
            <li class="list-group-item">
              <strong>Price:</strong>
              {{product.price}}$
            </li>
            <li class="list-group-item">
              <strong>Date Uploaded:</strong>
              {{String(product.date).split('T')[0]}}
            </li>
          </ul>
        </div>
      </div>

      <div class="row my-2">
        <div class="col-12">
          <ul class="list-group">
            <li class="list-group-item">
              <h2>Product Owner Information</h2>
            </li>
            <li class="list-group-item">
              <strong>Posted By:</strong>
              {{postedUser.name}}
            </li>
            <li class="list-group-item">
              <strong>Email:</strong>
              {{postedUser.email}}
            </li>
            <li class="list-group-item">
              <strong>Tel:</strong>
              {{postedUser.phone_number}}
            </li>
          </ul>
        </div>
      </div>

      <div class="row my-5">
        <button class="bottom-buttons btn btn-link text-secondary" @click="$router.go(-1)">Go Back</button>
        <router-link
          :to="'/product/edit/'+product._id"
          v-if="isLoggedIn && user._id == product.userID"
          class="bottom-buttons mx-2 text-warning btn btn-link"
        >Edit My Product</router-link>
        <button
          v-if="isLoggedIn && user._id == product.userID"
          class="bottom-buttons btn btn-link text-danger"
          @click="productDelete"
        >Delete My Product</button>
      </div>
      <!-- <div class="row">
        <router-link
          :to="'/product/edit/'+product._id"
          v-if="isLoggedIn && user._id == product.userID"
          class="bottom-buttons btn btn-primary mt-2"
        >Edit My Product</router-link>
      </div>
      <div class="row">
        <button
          v-if="isLoggedIn && user._id == product.userID"
          class="bottom-buttons btn btn-danger mt-2"
          @click="productDelete"
        >Delete</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'SpecificProduct',
  data() {
    return {
      loading: true,
      product: {},
      postedUser: {},
    }
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn',])
  },
  methods: {
    ...mapActions(['getProductById', 'deleteProduct', 'getProfile', 'getUserById']),

    productDelete() {
      const answer = confirm('Are you sure you want to delete this?');
      if (answer) {
        this.deleteProduct(this.product._id)
          .then(res => {
            if (res.data.success) {
              this.$router.push({ name: 'profile' })
            }
          }).catch(err => console.log(err));
      }
    },

    getUserPosted(id) {
      this.getUserById(id)
        .then(res => {
          this.postedUser = res.data;
        })
        .catch(err => console.log(err));
    },

    fetchProduct() {
      this.getProductById(this.$route.params.id)
        .then(res => {
          if (res.data.success) {
            this.product = res.data.product
            this.getUserPosted(this.product.userID)
            this.loading = false;
          }
        })
    }
  },
  mounted() {
    this.fetchProduct();
    if (this.isLoggedIn) {
      this.getProfile();
    }
  },
}
</script>

<style scoped>
.bottom-buttons {
  min-width: 165px;
}
.bottom-buttons:hover {
  -webkit-filter: drop-shadow(1px 1px 1px rgb(216, 216, 216));
}
.container {
  min-height: 80vh;
}
img {
  width: 90%;
}
</style>