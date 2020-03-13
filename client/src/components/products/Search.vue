<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12 col-md-10 d-flex">
        <input
          type="text"
          v-model="search"
          class="form-control"
          @keyup.enter="productSearch"
          placeholder="Search products"
        />
        <button class="btn btn-info" @click="productSearch">Search</button>
      </div>

      <div class="col-12 col-md-2 d-flex justify-content-end">
        <select name="sort_by" class="form-control" @change="onChangeSort">
          <option selected disabled>Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      search: '',
      categories: [
        'Wheel', 'Transimissions', 'Lights', 'Tires', 'Mirrors', 'Brakes', 'Air Filters', 'Car Care', 'Electronics', 'Others'
      ]
    }
  },
  methods: {
    ...mapActions(['searchProduct', 'sortProduct']),
    productSearch() {
      this.searchProduct(this.search);
    },
    onChangeSort(e) {
      let prop = e.target.value;
      this.sortProduct(prop);
    },
  }
}
</script>

<style scoped>
  

  .col-12 {
    margin-top: 1vh;
  }
</style>