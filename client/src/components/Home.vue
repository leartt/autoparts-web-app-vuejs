<template>
  <div>
    <div id="header-background">
      <div class="header-description">
        <div>
          <h1>The best way to buy and sell auto parts</h1>
        </div>
        <div>
          <p>Auto Parts is a platform to buy and sell car parts from around the world</p>
        </div>
        <div>
          <button>See More</button>
        </div>
      </div>
    </div>

    <div class="counterStats">
      <div class="counterUpv2">
        <i class="fa fa-tags" aria-hidden="true"></i>
        <ICountUp
          :delay="delay"
          :endVal="products.length"
          :options="options"
          @ready="onCounterProductsReady"
        />
        <h6>Products</h6>
      </div>
      <div class="counterUpv2">
        <i class="fa fa-user" aria-hidden="true"></i>
        <ICountUp
          :delay="delay"
          :endVal="users.length"
          :options="options"
          @ready="onCounterUsersReady"
        />
        <h6>Users Registered</h6>
      </div>
      <div class="counterUpv2">
        <i class="fas fa-copy"></i>
        <ICountUp
          :delay="delay"
          :endVal="categories.length"
          :options="options"
          @ready="onCounterCategoriesReady"
        />
        <h6>Categories</h6>
      </div>
    </div>

    <hr style="width: 80%" />

    <div class="text-center py-5">
      <h1>Latest Products</h1>
    </div>

    <ProductList nameComponent="home" />

    


  </div>
</template>

<script>
import ProductList from './products/ProductList';
import Product from './products/Product';
import { mapGetters, mapActions } from 'vuex';

import ICountUp from 'vue-countup-v2'

export default {
  name: 'Home',
  data() {
    return {
      delay: 1300,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  methods: {
    onCounterProductsReady(instance, CountUp) {
      instance.update(this.products.length);
    },
    onCounterUsersReady(instance, CountUp) {
      instance.update(this.users.length);
    },
    onCounterCategoriesReady(instance, CountUp) {
      instance.update(this.categories.length);
    },
    ...mapActions(['fetchProducts', 'getUsers'])
  },
  components: {
    ICountUp,
    ProductList,
  },
  computed: {
    ...mapGetters(['products', 'users', 'categories']),
  },

  created() {
    this.fetchProducts();
    this.getUsers();
  }
}
</script>

<style scoped>
#header-background {
  background-image: url("../assets/car-parts-2.jpg");
  height: 60vh;
  width: 100vw;
  background-position: center;
  z-index: 0;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
}
#header-background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(3, 3, 3, 0.5);
  height: inherit;
  width: 100vw;
}
.header-description {
  height: inherit;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: orange;
}
.header-description p {
  color: white;
}
button {
  background: transparent;
  color: white;
  border: 1px solid white;
  min-height: 5vh;
  min-width: 10vw;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s background;
}

h1 {
  text-transform: uppercase;
}

.counterUpv2 {
  font-size: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: min-content;
  margin: 5vh 5vw;
}

.counterUpv2 i {
  font-size: 0.7em;
}

button:hover {
  background: white;
  color: black;
}

.counterStats {
  display: flex;
  justify-content: center;
}
</style>