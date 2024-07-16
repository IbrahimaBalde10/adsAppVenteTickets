<!-- src/views/pages/Dashboard.vue -->
<template>
  <div>
    <VRow>
      <VCol cols="12" md="4">
        <CardStatisticsVertical
          :title="'Total Tickets'"
          :icon="'mdi-ticket'"
          :stats="totalTickets"
          :change="ticketChange"
        />
      </VCol>

      <VCol cols="12" md="4" v-for="ticket in ticketsByType" :key="ticket.type_name">
        <CardStatisticsVertical
          :title="ticket.type_name"
          :icon="'mdi-ticket'"
          :stats="ticket.count"
          :change="ticket.count / totalTickets * 100"
        />
      </VCol>

      <VCol cols="12" md="4" v-for="revenue in totalRevenueByType" :key="revenue.type_name">
        <CardStatisticsVertical
          :title="revenue.type_name + ' Revenue'"
          :icon="'mdi-currency-usd'"
          :stats="revenue.total_revenue"
          :change="revenue.total_revenue / totalRevenue * 100"
        />
      </VCol>

      <VCol cols="12" md="6">
        <CardStatisticsVertical
          :title="'Valid Tickets'"
          :icon="'mdi-check-circle-outline'"
          :stats="ticketStatusSummary.valid_tickets"
        />
      </VCol>

      <VCol cols="12" md="6">
        <CardStatisticsVertical
          :title="'Expired Tickets'"
          :icon="'mdi-close-circle-outline'"
          :stats="ticketStatusSummary.expired_tickets"
        />
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  // store.dispatch('tickets/fetchTotalTickets');
  store.dispatch('tickets/fetchTicketsByType');
  store.dispatch('tickets/fetchTotalRevenueByType');
  // store.dispatch('tickets/fetchTicketStatusSummary');
});

// const totalTickets = computed(() => store.getters['tickets/totalTickets']);
const ticketsByType = computed(() => store.getters['tickets/ticketsByType']);
const totalRevenueByType = computed(() => store.getters['tickets/totalRevenueByType']);
// const ticketStatusSummary = computed(() => store.getters['tickets/ticketStatusSummary']);

const totalRevenue = computed(() => {
  return totalRevenueByType.value.reduce((total, item) => total + item.total_revenue, 0);
});

const ticketChange = computed(() => {
  return totalTickets.value ? totalTickets.value % 100 : 0;
});
</script>
