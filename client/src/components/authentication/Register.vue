<template>
  <div class="container">
    <Error v-if="error" :msg="error" />

    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{successMessage}},
      <router-link to="/login">Login</router-link>
    </div>

    <h2 class="mt-3 mb-5">Register as a new user</h2>
    <div class="row" id="login-form">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Register</h4>
        </div>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" class="form-control" name="name" required v-model="name" />
          </div>
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
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              name="email"
              required
              v-model="email"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              class="form-control"
              name="phone"
              v-model="phone_number"
              required
            />
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
          <div class="form-group">
            <label for="confirmPpassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              class="form-control"
              name="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
          <router-link to="/login" class="card-link">Have an account?</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Error from '../Error';

export default {
  name: 'Register',
  components: {
    Error
  },
  data() {
    return {
      name: '',
      username: '',
      email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    ...mapActions(['register']),
    registerUser() {
      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        phone_number: this.phone_number,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.register(user).then(res => {
        scroll(0, 0);
        if (res.data.success) {
          this.name = '';
          this.username = '';
          this.email = '';
          this.phone_number = '',
          this.password = '';
          this.confirmPassword = '';
        }
      })
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapGetters(['error', 'successMessage'])
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
  min-height: 100vh;
}

.card-header {
  margin-bottom: 15px;
}

.card-link {
  margin-left: 10px;
}
</style>
