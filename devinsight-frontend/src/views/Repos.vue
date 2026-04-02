<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAnalyticsStore } from "../stores/analytics";

const store = useAnalyticsStore();
const search = ref("");

onMounted(() => store.fetchRepos("facebook"));

const langColors: Record<string, string> = {
  Go: "#00ADD8", TypeScript: "#3178C6", Rust: "#CE412B",
  Python: "#3572A5", HCL: "#7B42BC", JavaScript: "#F7DF1E",
  Vue: "#42b883", CSS: "#563d7c", Shell: "#89e051",
};

const filtered = computed(() =>
  store.repos.filter((r) =>
    r.name.toLowerCase().includes(search.value.toLowerCase()) ||
    r.description.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <MainLayout>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-5">
      <div>
        <h1 class="text-h6 font-weight-semibold">Repositories</h1>
        <p class="text-caption text-disabled font-mono mt-1">
          {{ store.repos.length }} PUBLIC REPOS
        </p>
      </div>
    </div>

    <!-- Search only -->
    <v-text-field
      v-model="search"
      placeholder="Search repositories..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      hide-details
      bg-color="surface"
      rounded="lg"
      class="font-mono mb-5"
      style="max-width: 420px;"
    />

    <!-- Loading -->
    <div v-if="store.loading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="amber" size="32" />
    </div>

    <!-- Repo Grid -->
    <v-row v-else density="comfortable">
      <v-col
        v-for="repo in filtered"
        :key="repo.id"
        cols="12" sm="6" md="4"
      >
        <v-card rounded="lg" class="repo-card h-100" hover>
          <v-card-text class="pa-5 d-flex flex-column" style="height: 100%;">
            <!-- Name -->
            <div class="d-flex align-center gap-2 mb-2">
              <v-icon size="16" color="amber">mdi-source-repository</v-icon>
              <span class="font-weight-semibold text-body-2">{{ repo.name }}</span>
            </div>

            <!-- Description -->
            <p class="text-caption text-disabled mb-4" style="line-height: 1.5; flex: 1;">
              {{ repo.description }}
            </p>

            <!-- Language -->
            <div class="d-flex align-center gap-1 mb-4">
              <span
                class="lang-dot"
                :style="{ background: langColors[repo.language] ?? '#888' }"
              />
              <span class="text-caption font-mono" style="color: #9aa0b8;">
                {{ repo.language }}
              </span>
            </div>

            <v-divider class="mb-3" style="border-color: rgba(255,255,255,0.06);" />

            <!-- Stats -->
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex gap-3">
                <span class="stat-item">
                  <v-icon size="13" class="mr-1" color="amber">mdi-star-outline</v-icon>
                  <span class="font-mono text-caption">{{ repo.stars }}</span>
                </span>
                <span class="stat-item">
                  <v-icon size="13" class="mr-1" style="color:#4fa3e0">mdi-source-fork</v-icon>
                  <span class="font-mono text-caption">{{ repo.forks }}</span>
                </span>
                <span class="stat-item">
                  <v-icon size="13" class="mr-1" style="color:#f87171">mdi-circle-outline</v-icon>
                  <span class="font-mono text-caption">{{ repo.openIssues }}</span>
                </span>
              </div>
              <span class="text-caption font-mono text-disabled">{{ repo.lastCommit }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Empty state -->
      <v-col v-if="filtered.length === 0" cols="12">
        <div class="d-flex flex-column align-center justify-center py-12 text-disabled">
          <v-icon size="40" class="mb-3">mdi-source-repository-multiple</v-icon>
          <p class="text-caption font-mono">NO REPOS MATCH YOUR SEARCH</p>
        </div>
      </v-col>
    </v-row>
  </MainLayout>
</template>

<style scoped>
.font-mono { font-family: 'Space Mono', monospace; }

.repo-card {
  background: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(255, 255, 255, 0.07) !important;
  transition: border-color 0.2s ease, transform 0.15s ease;
  cursor: pointer;
}
.repo-card:hover {
  border-color: rgba(245, 166, 35, 0.3) !important;
  transform: translateY(-2px);
}
.lang-dot {
  width: 9px; height: 9px;
  border-radius: 50%;
  display: inline-block;
}
.stat-item {
  display: flex;
  align-items: center;
}
</style>