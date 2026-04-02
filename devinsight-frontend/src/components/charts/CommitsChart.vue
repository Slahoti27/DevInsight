<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "vue-chartjs";
import { useAnalyticsStore } from "../../stores/analytics";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const store = useAnalyticsStore();

const chartData = computed(() => ({
  labels: Object.keys(store.commitsData),
  datasets: [
    {
      label: "Commits",
      data: Object.values(store.commitsData),
      borderColor: "#6366F1",
    },
  ],
}));
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-2xl">
    <h2 class="mb-4 font-semibold">Commits Over Time</h2>
    <Line :data="chartData"/>
  </div>
</template>