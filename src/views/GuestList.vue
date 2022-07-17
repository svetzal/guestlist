<template>
  <div id="guestlist">
    <h1>Guest List</h1>
    <div class="new">
      <h2>RSVP Me!</h2>
      <form>
        <input type="text" v-model="name" placeholder="Name">
        <input type="text" v-model="email" placeholder="Email">
        <input type="text" v-model="phone" placeholder="Phone Number">
        <button v-on:click="createGuest">RVSP Guest</button>
      </form>
    </div>
    <table class="guests">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
      <tr v-for="guest in guests" :key="guest.id">
        <td>{{ guest.name }}</td>
        <td>{{ guest.email }}</td>
        <td>{{ guest.phone }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createGuest } from '../graphql/mutations';
import { listGuests } from '../graphql/queries';
import { onCreateGuest } from '../graphql/subscriptions';

export default {
  name: 'guest-list',
  async created() {
    this.getGuests();
    this.subscribe();
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      guests: [],
    }
  },
  methods: {
    async createGuest() {
      const { name, email, phone } = this;
      if (!this.name) return;
      const guest = { name, email, phone };
      await API.graphql({
        query: createGuest,
        variables: { input: guest },
      });
      this.name = '';
      this.email = '';
      this.phone = '';
    },
    async getGuests() {
      const guests = await API.graphql({ query: listGuests });
      this.guests = guests.data.listGuests.items;
    },
    subscribe() {
      API.graphql({ query: onCreateGuest })
        .subscribe({
          next: (eventData) => {
            let guest = eventData.value.data.onCreateGuest;
            if (this.guests.some(g => g.name === guest.name)) return;
            this.guests = [...this.guests, guest];
          }
        })
    }
  }
}
</script>

<style lang="scss">
#guestlist {
  display: flex;
  flex-direction: column;
  align-items: center;

  table.guests {
    border: 1px solid black;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    background-color: rgba(255, 255, 255, 0.85);

    th {
      border-bottom: 1px solid black;
    }

    th,
    td {
      padding: 0.25em;
    }
  }

  div.new {
    margin: 1em;
    padding: 0.5em;
    border: 1px solid black;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    background-color: rgba(255, 255, 255, 0.85);

    h2 {
      text-align: left;
    }
  }
}
</style>