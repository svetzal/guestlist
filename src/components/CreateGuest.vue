<template>
  <div class="new">
    <h2>RSVP Guest</h2>
    <p>Please fill this out for yourself, and again for your +1</p>
    <form @submit.prevent="createGuest">
      <label for="name">Name</label>
      <input id="name" type="text" v-model="name" placeholder="Name">
      <label for="email">Email</label>
      <input id="email" type="text" v-model="email" placeholder="Email">
      <label for="phone">Phone Number</label>
      <input id="phone" type="text" v-model="phone" placeholder="Phone Number">
      <label for="attending">Are you able to attend?</label>
      <div class="radio">
        <div>
          <input type="radio" id="attending-yes" name="attending" v-bind:value="true" v-model="attending">
          <label for="attending-yes">Yes, I'm attending!</label>
        </div>
        <div>
          <input type="radio" id="attending-no" name="attending" v-bind:value="false"
                 v-model="attending">
          <label for="attending-no">I cannot attend.</label>
        </div>
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
      <div class="span">
        <input type="submit" v-bind:value="submitButtonLabel" :disabled="submitButtonDisabled">
      </div>
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
  computed: {
    submitButtonLabel() {
      if (!this.name) return "Please enter your name before submitting.";
      if (this.attending && !this.meal) return "Please select a meal before submitting.";
      return "Submit RSVP";
    },
    submitButtonDisabled() {
      return !this.name || (this.attending && !this.meal);
    },
  },
  methods: {
    async createGuest() {
      const {name, email, phone, attending, dietaryRequirements, meal} = this;
      if (!this.name) return;
      if (this.attending && !this.meal) return;
      const guest = {
        name,
        email: email.toLowerCase(),
        phone: this.stripPhone(phone),
        attending,
        dietaryRequirements,
        meal
      };
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
  padding: 0 1em 1em 1em;
  border: 1px solid black;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
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
    align-items: center;
    font-size: 10pt;


    label {
      font-size: 12pt;
      text-align: right;
    }

    input, select {
      font-size: 12pt;
    }

    div.radio {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }

    div.span {
      grid-column: span 2;
    }
  }
}
</style>