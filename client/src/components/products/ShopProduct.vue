<template>
  <div>
    <Search />

    <ProductList />

  </div>
</template>

<script>
import ProductList from './ProductList';
import Search from './Search';
export default {
  name: 'shopProduct',
  components: {
    ProductList,
    Search
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
</style>