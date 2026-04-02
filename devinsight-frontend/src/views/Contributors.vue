<script setup lang="ts">
import { computed, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAnalyticsStore } from "../stores/analytics";
import { Bar } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

const store = useAnalyticsStore();

onMounted(() => {
  if (!Object.keys(store.contributorsData).length) {
    store.fetchOverview();
  }
});

// Sort contributors by commit count
const sortedContributors = computed(() =>
  Object.entries(store.contributorsData)
    .map(([login, commits]) => ({ login, commits: commits as number }))
    .sort((a, b) => b.commits - a.commits)
);

const top = computed(() => sortedContributors.value.slice(0, 3));
const rest = computed(() => sortedContributors.value.slice(3));

// Medal colors for top 3
const medals = ["#f5a623", "#9aa0b8", "#CE412B"];
const medalLabels = ["1st", "2nd", "3rd"];

// Chart
const chartData = computed<ChartData<"bar">>(() => ({
  labels: sortedContributors.value.slice(0, 12).map((c) => c.login),
  datasets: [
    {
      label: "Commits",
      data: sortedContributors.value.slice(0, 12).map((c) => c.commits),
      backgroundColor: sortedContributors.value.slice(0, 12).map((_, i) =>
        i === 0 ? "#f5a623" : i === 1 ? "#9aa0b8" : i === 2 ? "#CE412B" : "#2a2f3d"
      ),
      borderRadius: 4,
      borderSkipped: false,
    },
  ],
}));

const chartOptions = computed<ChartOptions<"bar">>(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed.y} commits`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#5f6478", font: { size: 11 } },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: {
        color: "#5f6478",
        font: { family: "Space Mono", size: 11 },
      },
    },
  },
}));

// Avatar initials fallback
const initials = (login: string) =>
  login.slice(0, 2).toUpperCase();

// Avatar background colors cycling
const avatarColors = [
  "#f5a623", "#4fa3e0", "#3ecf8e", "#CE412B",
  "#7B42BC", "#3178C6", "#00ADD8", "#3572A5",
];
const avatarColor = (i: number) => avatarColors[i % avatarColors.length];
</script>

<template>
  <MainLayout>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h6 font-weight-semibold">Contributors</h1>
        <p class="text-caption text-disabled font-mono mt-1">
          {{ sortedContributors.length }} TOTAL · SORTED BY COMMITS
        </p>
      </div>
      <v-btn
        variant="outlined"
        size="small"
        color="on-surface"
        prepend-icon="mdi-refresh"
        class="font-mono text-caption"
        @click="store.fetchOverview()"
      >
        Refresh
      </v-btn>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="d-flex justify-center align-center" style="height: 200px;">
      <v-progress-circular indeterminate color="amber" size="32" />
    </div>

    <template v-else>
      <!-- Top 3 Podium -->
      <v-row class="mb-4" density="comfortable">
        <v-col
          v-for="(contributor, i) in top"
          :key="contributor.login"
          cols="12" md="4"
        >
          <v-card
            rounded="lg"
            class="kpi-card overflow-hidden"
            :style="`border-top: 2px solid ${medals[i]};`"
          >
            <v-card-text class="pa-5">
              <div class="d-flex align-center gap-3 mb-3">
                <!-- Avatar -->
                <div
                  class="contributor-avatar"
                  :style="`background: ${medals[i]}22; color: ${medals[i]}; border: 1px solid ${medals[i]}44;`"
                >
                  {{ initials(contributor.login) }}
                </div>
                <div>
                  <p class="text-body-2 font-weight-semibold">{{ contributor.login }}</p>
                  <p class="text-caption font-mono" :style="`color: ${medals[i]}`">
                    {{ medalLabels[i] }} PLACE
                  </p>
                </div>
              </div>
              <div class="d-flex align-end justify-space-between">
                <div>
                  <p class="text-caption text-disabled font-mono mb-1">COMMITS</p>
                  <span
                    class="text-h5 font-mono font-weight-bold"
                    :style="`color: ${medals[i]}`"
                  >
                    {{ contributor.commits.toLocaleString() }}
                  </span>
                </div>
                <v-icon size="32" :style="`color: ${medals[i]}; opacity: 0.2`">
                  mdi-trophy
                </v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Chart -->
      <v-card rounded="lg" class="kpi-card mb-4">
        <v-card-text class="pa-5">
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-body-2 font-weight-medium">Commit Distribution</span>
            <span class="text-caption font-mono text-disabled">TOP 12</span>
          </div>
          <Bar :data="chartData" :options="chartOptions" style="max-height: 220px;" />
        </v-card-text>
      </v-card>

      <!-- Full leaderboard -->
      <v-card rounded="lg" class="kpi-card">
        <v-card-text class="pa-5">
          <p class="text-body-2 font-weight-medium mb-4">Full Leaderboard</p>

          <!-- Header row -->
          <div class="leaderboard-header font-mono text-caption text-disabled mb-2">
            <span>#</span>
            <span>CONTRIBUTOR</span>
            <span class="text-right">COMMITS</span>
            <span class="text-right">SHARE</span>
          </div>

          <v-divider style="border-color: rgba(255,255,255,0.06); margin-bottom: 8px;" />

          <!-- Rows -->
          <div
            v-for="(contributor, i) in sortedContributors"
            :key="contributor.login"
            class="leaderboard-row"
          >
            <!-- Rank -->
            <span
              class="font-mono text-caption"
              :style="i < 3 ? `color: ${medals[i]}; font-weight: 700;` : 'color: #5f6478;'"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </span>

            <!-- Name + avatar -->
            <div class="d-flex align-center gap-2">
              <div
                class="contributor-avatar-sm"
                :style="`background: ${avatarColor(i)}22; color: ${avatarColor(i)};`"
              >
                {{ initials(contributor.login) }}
              </div>
              <span class="text-body-2">{{ contributor.login }}</span>
            </div>

            <!-- Commits -->
            <span class="font-mono text-caption text-right">
              {{ contributor.commits.toLocaleString() }}
            </span>

            <!-- Share bar -->
            <div class="share-bar-wrap">
              <div
                class="share-bar"
                :style="`
                  width: ${Math.round((contributor.commits / sortedContributors[0].commits) * 100)}%;
                  background: ${i < 3 ? medals[i] : '#2a2f3d'};
                `"
              />
              <span class="font-mono text-caption text-disabled ml-2" style="min-width: 36px;">
                {{ Math.round((contributor.commits / sortedContributors[0].commits) * 100) }}%
              </span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </MainLayout>
</template>

<style scoped>
.font-mono { font-family: 'Space Mono', monospace; }

.kpi-card {
  background: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(255, 255, 255, 0.07) !important;
  transition: border-color 0.2s ease;
}

.contributor-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 13px; font-weight: 700;
  flex-shrink: 0;
}

.contributor-avatar-sm {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 10px; font-weight: 700;
  flex-shrink: 0;
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 32px 1fr 80px 120px;
  gap: 12px;
  align-items: center;
  padding: 0 8px;
}

.leaderboard-row {
  display: grid;
  grid-template-columns: 32px 1fr 80px 120px;
  gap: 12px;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.15s;
}
.leaderboard-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

.share-bar-wrap {
  display: flex;
  align-items: center;
}
.share-bar {
  height: 6px;
  border-radius: 3px;
  min-width: 2px;
  transition: width 0.3s ease;
}
</style>