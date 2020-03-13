<template>
  <div class="container">
    <div v-if="!loading">
      <!-- <Error v-if="error_message" :msg="error_message" /> -->

      <div v-if="error" class="alert alert-danger" role="alert">{{error_msg}}</div>
      <div v-if="success_message" class="alert alert-success" role="alert">{{success_message}}</div>

      <form @submit="onUpload" enctype="multipart/form-data">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
            v-model="product.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            class="form-control"
            v-model="product.description"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="text" class="form-control" id="price" v-model="product.price" required />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select name="choose_category" class="form-control" @change="categoryOnChange">
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category"
              :selected="product.category === category"
            >{{category}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input
            type="file"
            class="form-control-file"
            name="productImage"
            :v-model="product.productImage"
            @input="onFileSelected"
          />
        </div>

        <div>
          <img
            class="img-fluid upload-img"
            v-if="product.productImage"
            :src="'http://localhost:5500/' +product.productImage"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-4">Edit</button>
      </form>
      <div class="my-2">
        <button class="btn btn-secondary" @click="goPrevious">Previous</button>
      </div>
    </div>
  </div>
</template>

<script>  
import axios from 'axios';

import { mapGetters, mapActions } from 'vuex';
import Error from '../Error';

export default {
  name: 'EditProduct',
  components: {
  },
  data() {
    return {
      loading: true,
      product: {},
      error_msg: '',
      error: false,
    }
  },
  computed: {
    ...mapGetters(['error_message', 'success_message', 'categories',]),
  },
  methods: {
    ...mapActions(['getProductById', 'editProduct']),
    onFileSelected(e) {
      console.log(this.product.productImage);
      this.product.productImage = e.target.files[0];
      console.log(this.product.productImage);
    },
    fetchProduct() {
      this.getProductById(this.$route.params.id)
        .then(res => {
          if (res.data.success) {
            this.product = res.data.product
            this.loading = false;
          }
        })
    },
    categoryOnChange(e) {
      console.log(e.target.value);
      this.product.category = e.target.value;
    },

    onUpload(e) {

      e.preventDefault();

      
      scroll(0,0);

      if (this.product.name === '' || this.product.name.length < 3) {
        this.error_msg = 'Name should contain 3 or more characters'
        this.error = true;
        return false;
      }
      if (this.product.description === '' || this.product.description.length < 50) {
        this.error_msg = 'Description should contain 50 or more characters'
        this.error = true;
        return false;
      }
      if (this.product.price == '' || Number(this.product.price) <= 0 || isNaN(this.product.price)) {
        this.error_msg = 'Price should be a valid number'
        this.error = true;
        return false;
      }

      this.error_msg = '';
      this.error = false;

      

      let formData = new FormData();
      formData.append('productImage', this.product.productImage);

      this.editProduct(this.product, formData)
        .then(res => {
            if(res.data.success) {
              console.log(res.data.msg);
            }
        })
        .catch(err => console.log(err));
    },
    goPrevious() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fetchProduct();
  },

}
</script>

<style scoped>
.container {
  min-height: 80vh;
}
.upload-img {
  height: 30vh;
}
</style>