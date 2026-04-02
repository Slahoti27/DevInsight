<script setup lang="ts">
import { onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAnalyticsStore } from "../stores/analytics";
import CommitsChart from "../components/charts/CommitsChart.vue";
import ContributorsChart from "../components/charts/ContributorsChart.vue";

const store = useAnalyticsStore();

onMounted(() => {
  store.fetchOverview();
});
</script>

<template>
  <MainLayout>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <!-- Loading -->
    <div v-if="store.loading">Loading...</div>

    <!-- KPI Cards -->
    <div v-else class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-gray-800 p-5 rounded-2xl shadow">
        <p>Total Commits</p>
        <h2 class="text-xl font-bold">
          {{ store.overview?.total_commits }}
        </h2>
      </div>

      <div class="bg-gray-800 p-5 rounded-2xl shadow">
        <p>PRs</p>
        <h2 class="text-xl font-bold">
          {{ store.overview?.total_prs }}
        </h2>
      </div>

      <div class="bg-gray-800 p-5 rounded-2xl shadow">
        <p>Contributors</p>
        <h2 class="text-xl font-bold">
          {{ store.overview?.total_contributors }}
        </h2>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-2 gap-6">
      <CommitsChart />
      <ContributorsChart />
    </div>
  </MainLayout>
</template>