<template>
  <div class="container">
    <Error v-if="error" :msg="error" />

    <h2 class="mt-3 mb-5">Login as a user</h2>
    <div class="row" id="login-form">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              name="username"
              v-model="username"
              required
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              name="password"
              v-model="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <router-link to="/register" class="card-link">Need an account</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Error from '../Error';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    Error,
  },
  methods: {
    ...mapActions(['login']),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.go('/profile');
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapGetters(['error'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 50%;
  padding: 10px;
}

.container {
  min-height: 70vh;
}

.card-header {
  margin-bottom: 15px;
}

.card-link {
  margin-left: 10px;
}
</style>
