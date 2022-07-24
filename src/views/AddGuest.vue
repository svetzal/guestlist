<template>
  <div class="screen">
    <h1>RSVP</h1>
    <CreateGuest />
  </div>
</template>

<script>
import CreateGuest from '../components/CreateGuest.vue';

export default {
  name: 'add-guest',
  components: {
    CreateGuest,
  },
}
</script>