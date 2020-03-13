<template>
    <div class="card col-12 col-md-5 col-lg-3 m-1 my-5 d-flex justify-content-end mt-md-0">
      <div class="card-item">
        <img :src="'http://localhost:5500/' + product.productImage" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">{{product.description | limitDescription}}...</p>
          <p class="card-text"><strong>Category:</strong> {{product.category}}</p>
          <p class="card-text text-success h5">{{product.price}}$</p>
          <router-link
            :to="{name: 'specificProduct', params: {id: product._id} }"
            class="btn btn-primary"
          >See Details</router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['product'],
  filters: {
    limitDescription(value) {
      return value.slice(0, 100);
    }
  }
}
</script>

<style scoped>
  .card {
    transition:  box-shadow 0.3s;
  }
  .card:hover {
    box-shadow: 1px 1px 6px rgb(202, 202, 202);
  }
</style>