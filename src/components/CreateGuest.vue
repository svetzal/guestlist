<template>
    <div class="new">
        <h2>RSVP Guest</h2>
        <form @submit.prevent="createGuest">
            <input type="text" v-model="name" placeholder="Name">
            <input type="text" v-model="email" placeholder="Email">
            <input type="text" v-model="phone" placeholder="Phone Number">
            <input type="submit" value="RVSP Guest">
        </form>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createGuest } from '../graphql/mutations';

export default {
    name: "create-guest",
    data() {
        return {
            name: '',
            email: '',
            phone: '',
        }
    },
    methods: {
        async createGuest() {
            const { name, email, phone } = this;
            if (!this.name) return;
            const guest = { name, email, phone: this.stripPhone(phone) };
            await API.graphql({
                query: createGuest,
                variables: { input: guest },
            });
            this.name = '';
            this.email = '';
            this.phone = '';
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

    input {
        padding: 4pt;
        margin: 4pt;
    }
}
</style>