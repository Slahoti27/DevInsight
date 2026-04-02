<script setup lang="ts">
import { computed } from "vue";
import { useAnalyticsStore } from "../../stores/analytics";
import { Bar } from "vue-chartjs";

const store = useAnalyticsStore();

const chartData = computed(() => ({
  labels: Object.keys(store.contributorsData),
  datasets: [
    {
      label: "Commits",
      data: Object.values(store.contributorsData),
      backgroundColor: "#22C55E",
    },
  ],
}));
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-2xl">
    <h2 class="mb-4 font-semibold">Top Contributors</h2>
    <Bar :data="chartData" />
  </div>
</template>