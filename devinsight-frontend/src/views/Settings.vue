<script setup lang="ts">
import { ref, watch } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAppTheme } from "../composables/useAppTheme";

const { isDark, toggleTheme } = useAppTheme();

// GitHub config — load from localStorage so they persist
const githubToken = ref(localStorage.getItem("gh_token") ?? "");
const defaultOwner = ref(localStorage.getItem("gh_owner") ?? "facebook");
const defaultRepo = ref(localStorage.getItem("gh_repo") ?? "react");

// Appearance
const accentColors = ["#f5a623", "#4fa3e0", "#3ecf8e", "#a78bfa", "#f87171"];
const selectedAccent = ref(localStorage.getItem("accent") ?? "#f5a623");
const compactMode = ref(localStorage.getItem("compact") === "true");

// Data
const refreshInterval = ref(localStorage.getItem("refresh") ?? "5");
const dateRange = ref(localStorage.getItem("dateRange") ?? "30");
const cacheEnabled = ref(localStorage.getItem("cache") !== "false");
const maxRepos = ref(localStorage.getItem("maxRepos") ?? "50");

// Notifications
const prSpikeEnabled = ref(localStorage.getItem("prSpike") !== "false");
const prSpikeThreshold = ref(localStorage.getItem("prSpikeThreshold") ?? "50");
const commitDropEnabled = ref(localStorage.getItem("commitDrop") === "true");
const commitDropThreshold = ref(localStorage.getItem("commitDropThreshold") ?? "10");

// Token display
const showToken = ref(false);
const maskedToken = ref(
  githubToken.value
    ? "••••••••••••" + githubToken.value.slice(-4)
    : "Not set"
);

function saveSettings() {
  localStorage.setItem("gh_token", githubToken.value);
  localStorage.setItem("gh_owner", defaultOwner.value);
  localStorage.setItem("gh_repo", defaultRepo.value);
  localStorage.setItem("accent", selectedAccent.value);
  localStorage.setItem("compact", String(compactMode.value));
  localStorage.setItem("refresh", refreshInterval.value);
  localStorage.setItem("dateRange", dateRange.value);
  localStorage.setItem("cache", String(cacheEnabled.value));
  localStorage.setItem("maxRepos", maxRepos.value);
  localStorage.setItem("prSpike", String(prSpikeEnabled.value));
  localStorage.setItem("prSpikeThreshold", prSpikeThreshold.value);
  localStorage.setItem("commitDrop", String(commitDropEnabled.value));
  localStorage.setItem("commitDropThreshold", commitDropThreshold.value);
  saved.value = true;
  setTimeout(() => (saved.value = false), 2000);
}

function clearCache() {
  sessionStorage.clear();
}

function resetAll() {
  localStorage.clear();
  window.location.reload();
}

const saved = ref(false);
</script>

<template>
  <MainLayout>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h6 font-weight-semibold">Settings</h1>
        <p class="text-caption text-disabled font-mono mt-1">
          DEVINSIGHT · CONFIGURATION
        </p>
      </div>
      <div class="d-flex gap-2">
        <v-btn variant="outlined" size="small" class="font-mono text-caption">
          Discard
        </v-btn>
        <v-btn
          color="amber"
          variant="flat"
          size="small"
          class="font-mono text-caption"
          :prepend-icon="saved ? 'mdi-check' : undefined"
          @click="saveSettings"
        >
          {{ saved ? "Saved!" : "Save Changes" }}
        </v-btn>
      </div>
    </div>

    <div style="max-width: 680px;">

      <!-- GitHub Connection -->
      <v-card rounded="lg" class="settings-card mb-4">
        <div class="section-header">
          <div class="section-icon" style="background: rgba(245,166,35,0.1);">
            <v-icon size="16" color="amber">mdi-github</v-icon>
          </div>
          <div class="flex-grow-1">
            <p class="text-body-2 font-weight-semibold">GitHub Connection</p>
            <p class="text-caption font-mono text-disabled">API TOKEN · ORG ACCESS</p>
          </div>
          <v-chip color="success" size="x-small" variant="tonal" class="font-mono">
            CONNECTED
          </v-chip>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Personal Access Token</p>
            <p class="text-caption text-disabled">Used for all GitHub API requests</p>
          </div>
          <div class="d-flex align-center gap-2">
            <v-text-field
              v-model="githubToken"
              :type="showToken ? 'text' : 'password'"
              density="compact"
              variant="outlined"
              hide-details
              style="width: 200px;"
              class="font-mono"
              :append-inner-icon="showToken ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showToken = !showToken"
            />
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Default Owner / Org</p>
            <p class="text-caption text-disabled">Used when no owner is specified</p>
          </div>
          <v-text-field
            v-model="defaultOwner"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 160px;"
            class="font-mono"
          />
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Default Repository</p>
            <p class="text-caption text-disabled">Used for overview and commit charts</p>
          </div>
          <v-text-field
            v-model="defaultRepo"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 160px;"
            class="font-mono"
          />
        </div>
      </v-card>

      <!-- Appearance -->
      <v-card rounded="lg" class="settings-card mb-4">
        <div class="section-header">
          <div class="section-icon" style="background: rgba(79,163,224,0.1);">
            <v-icon size="16" color="info">mdi-palette-outline</v-icon>
          </div>
          <div>
            <p class="text-body-2 font-weight-semibold">Appearance</p>
            <p class="text-caption font-mono text-disabled">THEME · ACCENT · DENSITY</p>
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Theme</p>
            <p class="text-caption text-disabled">Applies across all pages</p>
          </div>
          <v-btn
            variant="outlined"
            size="small"
            class="font-mono"
            :prepend-icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
            @click="toggleTheme"
          >
            {{ isDark ? "Dark" : "Light" }}
          </v-btn>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Accent Color</p>
            <p class="text-caption text-disabled">Used for active states and highlights</p>
          </div>
          <div class="d-flex gap-2">
            <div
              v-for="color in accentColors"
              :key="color"
              class="color-swatch"
              :style="{
                background: color,
                boxShadow: selectedAccent === color ? `0 0 0 2px #f5a623` : 'none'
              }"
              @click="selectedAccent = color"
            />
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Compact Mode</p>
            <p class="text-caption text-disabled">Reduces card padding and spacing</p>
          </div>
          <v-switch
            v-model="compactMode"
            color="amber"
            hide-details
            density="compact"
          />
        </div>
      </v-card>

      <!-- Data & Refresh -->
      <v-card rounded="lg" class="settings-card mb-4">
        <div class="section-header">
          <div class="section-icon" style="background: rgba(62,207,142,0.1);">
            <v-icon size="16" color="success">mdi-refresh</v-icon>
          </div>
          <div>
            <p class="text-body-2 font-weight-semibold">Data & Refresh</p>
            <p class="text-caption font-mono text-disabled">CACHE · AUTO-REFRESH · DATE RANGE</p>
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Auto-refresh Interval</p>
            <p class="text-caption text-disabled">How often the dashboard polls for new data</p>
          </div>
          <v-select
            v-model="refreshInterval"
            :items="[
              { title: 'Every 5 minutes', value: '5' },
              { title: 'Every 15 minutes', value: '15' },
              { title: 'Every 30 minutes', value: '30' },
              { title: 'Manual only', value: '0' },
            ]"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 180px;"
            class="font-mono"
          />
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Default Date Range</p>
            <p class="text-caption text-disabled">Applies to all charts on load</p>
          </div>
          <v-select
            v-model="dateRange"
            :items="[
              { title: 'Last 7 days', value: '7' },
              { title: 'Last 30 days', value: '30' },
              { title: 'Last 90 days', value: '90' },
              { title: 'This year', value: '365' },
            ]"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 180px;"
            class="font-mono"
          />
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Cache API Responses</p>
            <p class="text-caption text-disabled">Reduces API calls, refreshes every 5 min</p>
          </div>
          <v-switch v-model="cacheEnabled" color="amber" hide-details density="compact" />
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Max Repos Shown</p>
            <p class="text-caption text-disabled">Limits results on the Repositories page</p>
          </div>
          <v-select
            v-model="maxRepos"
            :items="['20', '50', '100', 'All']"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 100px;"
            class="font-mono"
          />
        </div>
      </v-card>

      <!-- Notifications -->
      <v-card rounded="lg" class="settings-card mb-4">
        <div class="section-header">
          <div class="section-icon" style="background: rgba(167,139,250,0.1);">
            <v-icon size="16" style="color: #a78bfa;">mdi-bell-outline</v-icon>
          </div>
          <div>
            <p class="text-body-2 font-weight-semibold">Notifications</p>
            <p class="text-caption font-mono text-disabled">ALERTS · THRESHOLDS</p>
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">PR Spike Alert</p>
            <p class="text-caption text-disabled">Alert when open PRs exceed this number</p>
          </div>
          <div class="d-flex align-center gap-3">
            <v-text-field
              v-model="prSpikeThreshold"
              density="compact"
              variant="outlined"
              hide-details
              style="width: 80px;"
              class="font-mono"
              type="number"
            />
            <v-switch v-model="prSpikeEnabled" color="amber" hide-details density="compact" />
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Commit Drop Alert</p>
            <p class="text-caption text-disabled">Alert when weekly commits fall below this</p>
          </div>
          <div class="d-flex align-center gap-3">
            <v-text-field
              v-model="commitDropThreshold"
              density="compact"
              variant="outlined"
              hide-details
              style="width: 80px;"
              class="font-mono"
              type="number"
            />
            <v-switch v-model="commitDropEnabled" color="amber" hide-details density="compact" />
          </div>
        </div>
      </v-card>

      <!-- Danger Zone -->
      <v-card rounded="lg" class="settings-card danger-card mb-4">
        <div class="section-header">
          <div class="section-icon" style="background: rgba(248,113,113,0.1);">
            <v-icon size="16" color="error">mdi-alert-outline</v-icon>
          </div>
          <div>
            <p class="text-body-2 font-weight-semibold" style="color: #f87171;">Danger Zone</p>
            <p class="text-caption font-mono text-disabled">IRREVERSIBLE ACTIONS</p>
          </div>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Clear Cached Data</p>
            <p class="text-caption text-disabled">Forces a fresh fetch on next page load</p>
          </div>
          <v-btn
            variant="outlined"
            size="small"
            color="error"
            class="font-mono text-caption"
            @click="clearCache"
          >
            Clear Cache
          </v-btn>
        </div>

        <v-divider class="section-divider" />

        <div class="setting-row">
          <div>
            <p class="text-body-2 font-weight-medium">Reset All Settings</p>
            <p class="text-caption text-disabled">Restores defaults and clears your token</p>
          </div>
          <v-btn
            variant="outlined"
            size="small"
            color="error"
            class="font-mono text-caption"
            @click="resetAll"
          >
            Reset Everything
          </v-btn>
        </div>
      </v-card>

    </div>
  </MainLayout>
</template>

<style scoped>
.font-mono { font-family: 'Space Mono', monospace; }

.settings-card {
  background: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(var(--v-border-color), 0.08) !important;
}
.danger-card {
  border-color: rgba(248, 113, 113, 0.15) !important;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
}
.section-icon {
  width: 30px; height: 30px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.section-divider {
  border-color: rgba(var(--v-border-color), 0.06) !important;
}
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  gap: 16px;
}
.color-swatch {
  width: 20px; height: 20px;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  transition: transform 0.15s;
}
.color-swatch:hover { transform: scale(1.15); }
</style>