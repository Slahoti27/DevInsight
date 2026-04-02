<script setup lang="ts">
import { computed } from "vue";
import { useAnalyticsStore } from "../../stores/analytics";
import { Bar } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

const store = useAnalyticsStore();

const chartData = computed<ChartData<"bar">>(() => {
  const data = store.contributorsData;

  if (!data || !Object.keys(data).length) {
    return { labels: [], datasets: [] };
  }

  // Sort by commit count descending, take top 8
  const sorted = Object.entries(data)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 8);

  return {
    labels: sorted.map(([name]) => name),
    datasets: [
      {
        label: "Commits",
        data: sorted.map(([, count]) => count as number),
        backgroundColor: "#3ecf8e",
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<"bar">>(() => ({
  responsive: true,
  maintainAspectRatio: true,
  indexAxis: "y",           // horizontal bars — better for names
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed.x} commits`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "#5f6478", font: { family: "Space Mono" } },
    },
    y: {
      grid: { display: false },
      ticks: { color: "#e8eaf0", font: { size: 11 } },
    },
  },
}));
</script>

<template>
  <div>
    <div
      v-if="!store.contributorsData || !Object.keys(store.contributorsData).length"
      class="d-flex align-center justify-center"
      style="height: 160px; color: #5f6478; font-size: 12px;"
    >
      No contributor data
    </div>
    <Bar v-else :data="chartData" :options="chartOptions" />
  </div>
</template>