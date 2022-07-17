<template>
  <div id="guestlist">
    <h1>Guest List</h1>
    <CreateGuest />
    <GuestsTable />
  </div>
</template>

<script>
import CreateGuest from '../components/CreateGuest.vue';
import GuestsTable from '../components/GuestsTable.vue';

export default {
  name: 'guest-list',
  components: {
    CreateGuest,
    GuestsTable,
  },
}
</script>

<style lang="scss">
#guestlist {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>