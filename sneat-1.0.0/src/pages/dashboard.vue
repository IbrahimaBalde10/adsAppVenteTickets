<script setup>
// liste des composants affichés sur le dashboard
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'
import AnalyticsProfitReport from '@/views/dashboard/AnalyticsProfitReport.vue'
import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'


// myImages
import userIcon from '@images/myImages/user.png'
import transactionIcon from '@images/myImages/transaction.png'
import ticketIcon from '@images/myImages/ticket.png'
// utisation de store

import { useStore } from 'vuex';
const icon = 'bx-log-in';
const store = useStore();
onMounted(() => {
  store.dispatch('users/fetchUsers');
  store.dispatch('transactions/fetchTransactions');
  store.dispatch('tickets/fetchTickets');
});
const userCount = computed(() => store.getters['users/userCount']); // Utilisation de computed pour réagir aux changements
const transactionCount = computed(() => store.getters['transactions/transactionCount']); // Utilisation de computed pour réagir aux changements
const ticketCount = computed(() => store.getters['tickets/ticketCount']); // Utilisation de computed pour réagir aux changements



</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol
      cols="12"
      md="8"
    >  
    <!-- <p>Users: {{userCount}}</p>,  <p>Transactions: {{transactionCount}}</p> -->
    <!-- <p>Tickets: {{ticketCount}}</p> -->
      <AnalyticsCongratulations />
    </VCol>

    <VCol
      cols="12"
      sm="4"
    >
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="12" md="6">
    <CardStatisticsVertical
      :title="'Utilisateurs'"
      :image="userIcon"
      :change="userCount%100"
      :stats="userCount"
    />
  </VCol>
  <!-- 👉 Tickets -->
  <VCol cols="12" md="6">
    <CardStatisticsVertical
      :title="'Tickets'"
      :image="ticketIcon"
      :change="ticketCount%100"
      :stats="ticketCount"
      
    />
  </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Total Revenue -->
    <VCol
      cols="12"
      md="8"
      order="2"
      order-md="1"
    >
      <AnalyticsTotalRevenue />
    </VCol>

    <VCol
      cols="12"
      sm="8"
      md="4"
      order="1"
      order-md="2"
    >
      <VRow>
        <!-- 👉 Payments -->
        <VCol  cols="12" sm="6">
          <CardStatisticsVertical
            v-bind=" {
              title: 'Payments',
              image: paypal,
              stats: '$2,468',
              change: -14.82,
            }"
          />
        </VCol>

     
  <!-- 👉 Transactions -->
  <VCol cols="12" md="6">
    <CardStatisticsVertical
      :title="'Transactions'"
      :image="transactionIcon"
      :change="transactionCount%100"
      :stats="transactionCount"
      :to="{ name: 'transcation' }"
    />
  </VCol>
 
</VRow>

      <VRow>
        <!-- 👉 Profit Report -->
        <VCol
          cols="12"
          sm="12"
        >
          <AnalyticsProfitReport />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Order Statistics -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsOrderStatistics />
    </VCol>

    <!-- 👉 Tabs chart -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsFinanceTabs />
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsTransactions />
    </VCol>
  </VRow>
</template>
