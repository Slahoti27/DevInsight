<script setup lang="ts">
import { onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAnalyticsStore } from "../stores/analytics";
import CommitsChart from "../components/charts/CommitsChart.vue";
import ContributorsChart from "../components/charts/ContributorsChart.vue";

const store = useAnalyticsStore();
onMounted(() => store.fetchOverview());
</script>

<template>
  <MainLayout>
    <!-- Page Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h6 font-weight-semibold">Overview</h1>
        <p class="text-caption text-disabled font-mono mt-1">
          LAST 30 DAYS · SYNCED JUST NOW
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
      <!-- KPI Cards -->
      <v-row class="mb-4" density="comfortable">
        <!-- Commits -->
        <v-col cols="12" md="4">
          <v-card
            rounded="lg"
            class="kpi-card overflow-hidden"
            style="border-top: 2px solid #f5a623;"
          >
            <v-card-text class="pa-5">
              <p class="text-caption font-mono text-disabled mb-3" style="letter-spacing: 0.08em;">
                TOTAL COMMITS
              </p>
              <div class="d-flex align-end justify-space-between">
                <span class="text-h4 font-mono font-weight-bold text-amber">
                  {{ store.overview?.total_commits?.toLocaleString() ?? "—" }}
                </span>
                <v-chip size="x-small" color="success" variant="tonal" class="font-mono mb-1">
                  ↑ 12%
                </v-chip>
              </div>
              <p class="text-caption text-disabled mt-2">vs last month</p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- PRs -->
        <v-col cols="12" md="4">
          <v-card
            rounded="lg"
            class="kpi-card overflow-hidden"
            style="border-top: 2px solid #4fa3e0;"
          >
            <v-card-text class="pa-5">
              <p class="text-caption font-mono text-disabled mb-3" style="letter-spacing: 0.08em;">
                PULL REQUESTS
              </p>
              <div class="d-flex align-end justify-space-between">
                <span class="text-h4 font-mono font-weight-bold" style="color: #4fa3e0;">
                  {{ store.overview?.total_prs?.toLocaleString() ?? "—" }}
                </span>
                <v-chip size="x-small" color="info" variant="tonal" class="font-mono mb-1">
                  ↑ 8%
                </v-chip>
              </div>
              <p class="text-caption text-disabled mt-2">vs last month</p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Contributors -->
        <v-col cols="12" md="4">
          <v-card
            rounded="lg"
            class="kpi-card overflow-hidden"
            style="border-top: 2px solid #3ecf8e;"
          >
            <v-card-text class="pa-5">
              <p class="text-caption font-mono text-disabled mb-3" style="letter-spacing: 0.08em;">
                CONTRIBUTORS
              </p>
              <div class="d-flex align-end justify-space-between">
                <span class="text-h4 font-mono font-weight-bold text-success">
                  {{ store.overview?.total_contributors ?? "—" }}
                </span>
                <v-chip size="x-small" color="success" variant="tonal" class="font-mono mb-1">
                  +3 new
                </v-chip>
              </div>
              <p class="text-caption text-disabled mt-2">this month</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Charts -->
      <v-row density="comfortable">
        <v-col cols="12" md="6">
          <v-card rounded="lg" class="kpi-card">
            <v-card-text class="pa-5">
              <div class="d-flex justify-space-between align-center mb-4">
                <span class="text-body-2 font-weight-medium">Commits / Week</span>
                <span class="text-caption font-mono text-disabled">JAN – APR 2026</span>
              </div>
              <CommitsChart />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card rounded="lg" class="kpi-card">
            <v-card-text class="pa-5">
              <div class="d-flex justify-space-between align-center mb-4">
                <span class="text-body-2 font-weight-medium">Contributor Split</span>
                <span class="text-caption font-mono text-disabled">ACTIVE DEVS</span>
              </div>
              <ContributorsChart />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
.kpi-card:hover {
  border-color: rgba(255, 255, 255, 0.14) !important;
}
</style>