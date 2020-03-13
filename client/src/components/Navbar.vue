<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img class="navbar-img img-responsive" src="../assets/navbar-brand.png" />AutoParts
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mr-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Products</a>
            <div class="dropdown-menu">
              <router-link class="nav-link dropdown-item" to="/product/register">Register</router-link>
              <router-link class="nav-link dropdown-item" to="/product/shop">Shop</router-link>
            </div>
          </li>-->
          <router-link class="nav-link" to="/product/register">Products</router-link>
          <router-link class="nav-link" to="/product/shop">Shop</router-link>

          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>

          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          
          <div v-if="!loading">
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Hello, {{user.email}}</a>
              <div class="dropdown-menu">
                <router-link class="nav-link" to="/profile">My Profile</router-link>
                <a class="nav-link logout-link" to="/login" @click.prevent="logoutUser">Logout</a>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'Navbar',
  data() {
    return {
      loading: true
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'user'])
  },
  methods: {
    ...mapActions(["logout", 'getProfile']),
    logoutUser() {
      this.logout();
      this.loading = true;
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.getProfile()
      .then(res => {
        if(res.data.user) {
          this.loading = false;
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-img {
  height: 5vh;
}
.logout-link {
  cursor: pointer;
}
</style>
