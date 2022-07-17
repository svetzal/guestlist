<template>
  <h1 class="splash">Holly and Dalton, 2022</h1>
  <div v-bind:hidden="authenticated">
  <input class="secret" v-model="code" type="text" placeholder="Secret Code">
  <button v-on:click="checkCode" class="secret">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created() {
    // https://www.hollyanddalton2022.com/?c=Sweet!
    this.code = this.$router.currentRoute._value.query.c;
    this.checkCode();
  },
  data() {
    return {
      code: '',
      authenticated: window.sessionStorage["authenticated"],
    };
  },
  methods: {
    checkCode() {
      if (this.code == "Sweet!") {
        this.saveAuthentication();
      }
    },
    saveAuthentication() {
        this.authenticated = true;
        window.sessionStorage["authenticated"] = true;
        this.$router.push({name: "guests"});
    }
  }
}
</script>

<style lang="scss">
h1.splash {
  color: black;
  font-size: 20vh;
  text-shadow: 0 0 10pt rgba(255, 255, 255, 1.0);
}

.secret {
  font-size: 2em;
}
</style>