<template>
  <div class="container">
    <Error v-if="error_message" :msg="error_message" />

    <div v-if="error" class="alert alert-danger" role="alert">{{error_msg}}</div>

    <div v-if="success_message" class="alert alert-success" role="alert">{{success_message}}</div>

    <div id="">
      <h1 class="mt-3 mb-5">Register new product</h1>
    </div>

    <form @submit="onUpload">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="emailHelp"
          v-model="name"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          class="form-control"
          v-model="description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" v-model="price" required />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select
          id="category"
          name="choose_category"
          class="form-control"
          @change="categoryOnChange"
          required
        >
          <option selected disabled>Choose category</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >{{category}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form-control-file" id="image" @change="onFileSelected" required />
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-4">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Error from '../Error'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'RegisterProducts',
  data() {
    return {
      name: '',
      description: '',
      price: '',
      category: '',
      productImage: null,
      error: false,
      error_msg: '',
    }
  },
  components: {

  },
  computed: {
    ...mapGetters(['user', 'error_message', 'success_message', 'categories']),
  },
  methods: {
    ...mapActions(['getProfile', 'addProduct']),
    onFileSelected(e) {
      this.productImage = e.target.files[0];
    },
    categoryOnChange(e) {
      this.category = e.target.value;
    },
    onUpload(e) {
      e.preventDefault();

      scroll(0, 0);

      if (this.name === '' || this.name == null || this.name.length < 3) {
        this.error_msg = 'Name should contain 3 or more characters'
        this.error = true;
        return false;
      }
      if (this.description === '' || this.description.length < 50) {
        this.error_msg = 'Description should contain 50 or more characters'
        this.error = true;
        return false;
      }
      if (this.price == '' || Number(this.price) <= 0 || isNaN(this.price)) {
        this.error_msg = 'Price should be a valid number'
        this.error = true;
        return false;
      }

      this.error_msg = '';
      this.error = false;


      const formData = new FormData();
      formData.set('name', this.name);
      formData.set('description', this.description);
      formData.set('price', this.price);
      formData.set('category', this.category);
      formData.set('userID', this.user._id);
      formData.append('productImage', this.productImage, this.productImage.name);

      this.addProduct(formData)
        .then(res => {
          if (res.data.success) {
              this.name = '';
              this.description = '';
              this.price = '';
              this.category = '';
              this.productImage = null;
              document.getElementById('image').value = ''
              document.getElementById('category').selectedIndex = 0;
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getProfile();
  }
}
</script>

<style scoped>
.container {
  min-height: 85vh;
}
</style>