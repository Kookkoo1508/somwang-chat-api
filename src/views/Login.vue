<template>
  <div>
    <b-form @submit="onSubmit">
      <h2 class="mt-5">Join Chat</h2>
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="userName"
          required
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.name = this.userName;
      this.$router.push({
        name: "Chat",
        params: { name: this.userName }
      });
    }
  }
};
</script>

<style scoped></style>
