<template>
    <div class="alert alert-danger" role="alert">{{msg}}</div>
</template>

<script>
export default {
  name: 'Error',
  props: ['msg']
}
</script>

<style scoped>
</style>