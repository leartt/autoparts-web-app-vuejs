<template>
  <div class="container">
    <div class="row product-row" v-if="nameComponent == 'home'">
      <Product v-for="product in latestProducts" :key="product._id" :product="product" />
    </div>

    <div v-else>
      <div class="row product-row">
        <Product v-for="product in paginatedFilteredData" :key="product._id" :product="product" />
      </div>

      <div class="row">
        <div class="clearfix btn-group col-md-2 offset-md-5 mt-5">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :disabled="page == 0"
            @click="page--"
          >Prev</button>
          <button
            type="button"
            @click="page++"
            :disabled="page > numberOfPages - 2"
            class="btn btn-sm btn-outline-secondary"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from './Product';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ProductList",
  props: ['nameComponent'],
  data() {
    return {
      page: 0,
      perPage: 9,
      pages: [],
    }
  },
  components: {
    Product,
  },
  computed: {
    ...mapGetters(['products', 'search']),

    latestProducts() {
      return this.products.slice().reverse().slice(0, 3);
    },

    filteredProducts() {
      return this.products.filter(p => {
          return p.name.toLowerCase().match(this.search)
        })


    },

    numberOfPages() {
      return Math.ceil(this.products.length / this.perPage);
    },

    paginatedFilteredData() {
      const start = this.page * this.perPage;
      const end = start + this.perPage;
      return this.products.slice(start, end).filter(p => {
        return p.name.toLowerCase().match(this.search)
      });
    }

  },
  methods: {
    ...mapActions(['fetchProducts']),
  },
  created() {
    this.fetchProducts();
  },
}
</script>

<style scoped>
.row.product-row {
  display: flex;
  justify-content: space-around;
}
</style>