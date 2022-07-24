<template>
  <div class="new">
    <h2>RSVP Guest</h2>
    <form @submit.prevent="createGuest">
      <label for="name">Name</label>
      <input id="name" type="text" v-model="name" placeholder="Name">
      <label for="email">Email</label>
      <input id="email" type="text" v-model="email" placeholder="Email">
      <label for="phone">Phone Number</label>
      <input id="phone" type="text" v-model="phone" placeholder="Phone Number">
      <label for="attending">Are you able to attend?</label>
      <div>
        <input type="radio" id="attending-yes" name="attending" v-bind:value="true" v-model="attending">
        <label style="margin-left: 4pt;" for="attending-yes">Yes, I'm attending!</label>
        <input style="margin-left: 18pt;" type="radio" id="attending-no" name="attending" v-bind:value="false" v-model="attending">
        <label style="margin-left: 4pt;" for="attending-no">I regret that I'm unable to attend.</label>
      </div>
      <label for="dietaryRequirements">Dietary Requirements</label>
      <input id="dietaryRequirements" type="text"
             v-model="dietaryRequirements"
             placeholder="Dietary Requirements">
      <label for="meal">Meal</label>
      <select id="meal" v-model="meal">
        <option value="">Select Meal</option>
        <option>Beef</option>
        <option>Chicken</option>
        <option>Vegetarian</option>
      </select>
      <input type="submit" value="RVSP Guest">
    </form>
  </div>
</template>

<script>
import {API} from 'aws-amplify';
import {createGuest} from '../graphql/mutations';

export default {
  name: "create-guest",
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      attending: true,
      dietaryRequirements: '',
      meal: '',
    }
  },
  methods: {
    async createGuest() {
      const {name, email, phone, attending, dietaryRequirements, meal} = this;
      if (!this.name) return;
      if (this.attending && !this.meal) return;
      const guest = {name, email: email.toLowerCase(), phone: this.stripPhone(phone), attending, dietaryRequirements, meal};
      await API.graphql({
        query: createGuest,
        variables: {input: guest},
      });
      this.name = '';
      this.email = '';
      this.phone = '';
      this.attending = true;
      this.dietaryRequirements = '';
      this.meal = '';
      this.$router.push({name: 'guests'});
    },
    stripPhone(value) {
      return value.replace(/[^\d]/g, "");
    }
  }
}
</script>

<style lang="scss">
div.new {
  margin: 1em;
  border: 1px solid black;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  background-color: rgba(255, 255, 255, 0.85);

  h2 {
    margin: 0.5em;
    text-align: left;
  }

  form {
    padding: 0;
    margin: 0;
    display: grid;
    gap: 6pt;
    grid-template-columns: 1fr 2fr;

    font-size: 10pt;

    align-items: baseline;

    label {
      font-size: 12pt;
      text-align: right;
    }

    input, select {
      font-size: 12pt;
    }

    input[type=submit] {
      grid-column: span 2;
    }
  }
}
</style>