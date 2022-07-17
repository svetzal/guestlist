<template>
    <table class="guests">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
        <tr v-for="guest in guests" :key="guest.id">
            <td>{{ guest.name }}</td>
            <td>
                <span v-if="guest.email">
                    <a href="mailto:{{ guest.email }}">
                        {{ guest.email }}
                    </a>
                </span>
            </td>
            <td>
                <span v-if="guest.phone">
                    <a href="tel:{{ guest.phone }}">
                        {{ formatPhone(guest.phone) }}
                    </a>
                </span>
            </td>
        </tr>
    </table>
</template>

<script>
import { API } from 'aws-amplify';
import { listGuests } from '../graphql/queries';
import { onCreateGuest } from '../graphql/subscriptions';

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
        },
        formatPhone(value) {
            return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
    }
}
</script>

<style lang="scss">
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
</style>