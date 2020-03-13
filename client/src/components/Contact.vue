<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <h3 class="text-center">You can contact us in the form below</h3>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-if="contactError">{{contactError}}</div>
    <div class="alert alert-success" role="alert" v-if="contactMsg">{{contactMsg}}</div>

    <form @submit="contactSubmit" class="row">
      <div class="form-group col-12">
        <label for="validationName">First name</label>
        <input type="text" class="form-control" id="validationName" v-model="name" required />
      </div>
      <div class="form-group col-12">
        <label for="validationSurname">Last name</label>
        <input type="text" class="form-control" id="validationSurname" v-model="surname" required />
      </div>
      <div class="form-group col-12">
        <label for="validationEmail">Email</label>
        <input type="email" class="form-control" id="validationEmail" v-model="email" required />
      </div>
      <div class="form-group col-12">
        <label for="validationSubject">Subject</label>
        <input type="text" class="form-control" id="validationSubject" v-model="subject" />
      </div>
      <div class="form-group col-12">
        <label for="validationServer01">Message</label>
        <textarea class="form-control" id="validationServer01" rows="6" v-model="message" required />
      </div>
      <button class="btn btn-danger mx-3" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Contact',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      subject: '',
      message: '',
    }
  },
  computed: {
    ...mapGetters(['contactError', 'contactMsg'])
  },
  methods: {

    ...mapActions(['submitContact']),

    contactSubmit(e) {
      e.preventDefault();

      let contact = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        subject: this.subject,
        message: this.message
      }

      this.submitContact(contact)
        .then(res => {
          if (res.data.success) {
            this.name = '';
            this.surname = '';
            this.email = '';
            this.subject = '';
            this.message = '';
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
</style>