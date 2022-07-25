<template>
  <div class="guests">
    <div class="guest" v-for="guest in guests" :key="guest.id">
      <div class="title">
        <span class="attending" v-if="guest.attending" style="color: transparent; text-shadow: 0 0 0 green;">✔️</span>
        <span class="attending" v-else>❌</span>
        <span class="name">{{ guest.name }}</span>
        <span class="email">
          <a v-if="guest.email" v-bind:href="'mailto:'+guest.name+' <'+guest.email+'>'">
            ✉
          </a>
        </span>
        <span class="phone">
          <a v-if="guest.phone" v-bind:href="'tel:'+guest.phone">
            ☎
          </a>
        </span>
      </div>
      <div class="subtitle">
        <span class="meal" v-if="guest.meal">Having {{ guest.meal }}</span>
        <span class="meal" v-else style="color: red;">No meal chosen</span>
        <span class="diet" v-if="guest.dietaryRequirements">{{ guest.dietaryRequirements }}</span>
        <span class="diet" v-else>No special dietary requirements.</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
div.guests {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1em;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.85);
  align-items: stretch;

  div.guest {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    align-items: stretch;

    &:nth-child(even) {
      background-color: rgba(236, 236, 236, 0.85);
    }

    div.title {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-between;

      span.name {
        flex-grow: 1;
      }

      span.phone > a, span.email > a {
        color: transparent;
        text-shadow: 0 0 0 black;
        text-decoration: none;
      }
    }

    div.subtitle {
      font-size: 90%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 6pt;
    }

    span {
      text-align: left;
      margin: 0 6pt;
    }
  }
}
</style>

<script>
import {API} from 'aws-amplify';
import {listGuests} from '../graphql/queries';
import {onCreateGuest} from '../graphql/subscriptions';

export default {
  name: 'guests-table',
  async created() {
    this.getGuests();
    this.subscribe();
  },
  data() {
    return {
      guests: [],
    }
  },
  methods: {
    async getGuests() {
      const guests = await API.graphql({query: listGuests});
      this.guests = guests.data.listGuests.items;
    },
    subscribe() {
      API.graphql({query: onCreateGuest})
          .subscribe({
            next: (eventData) => {
              let guest = eventData.value.data.onCreateGuest;
              if (this.guests.some(g => g.name === guest.name)) return;
              this.guests = [...this.guests, guest];
            }
          })
    },
    formatPhone(value) {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
  }
}
</script>