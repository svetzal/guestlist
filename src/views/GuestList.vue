<template>
  <div class="screen">
    <h1>Guest List</h1>
    <router-link to="/guests/add">RSVP Me!</router-link>
    <GuestsTable />
  </div>
</template>

<script>
import GuestsTable from '../components/GuestsTable.vue';

export default {
  name: 'guest-list',
  components: {
    GuestsTable,
  },
}
</script>

<style lang="scss">
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>