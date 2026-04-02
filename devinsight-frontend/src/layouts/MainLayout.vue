<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAppTheme } from "../composables/useAppTheme";

const route = useRoute();
const { isDark, toggleTheme } = useAppTheme();

const breadcrumb = computed(() => {
  const map: Record<string, string> = {
    "/": "Dashboard",
    "/repos": "Repositories",
    "/contributors": "Contributors",
  };
  return map[route.path] ?? "Dashboard";
});
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent width="220" class="sidebar">

      <!-- Logo -->
      <div class="logo-area">
        <div class="logo-mark">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path d="M6 4L2 9L6 14" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 4L16 9L12 14" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 3L8 15" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-dev">Dev</span>
          <span class="logo-insight">Insight</span>
        </div>
      </div>

      <!-- Nav -->
      <div class="nav-section">
        <p class="nav-label">MAIN</p>

        <router-link to="/" custom v-slot="{ isActive, navigate }">
          <div :class="['nav-item', isActive && 'active']" @click="navigate">
            <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="1" width="6" height="6" rx="1.5"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5"/>
            </svg>
            Dashboard
            <span v-if="isActive" class="nav-badge">LIVE</span>
          </div>
        </router-link>

        <router-link to="/repos" custom v-slot="{ isActive, navigate }">
          <div :class="['nav-item', isActive && 'active']" @click="navigate">
            <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="12" height="12" rx="2"/>
              <path d="M2 6h12M6 6v8"/>
            </svg>
            Repositories
          </div>
        </router-link>

        <router-link to="/contributors" custom v-slot="{ isActive, navigate }">
          <div :class="['nav-item', isActive && 'active']" @click="navigate">
            <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="8" cy="5" r="3"/>
              <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5"/>
            </svg>
            Contributors
          </div>
        </router-link>

        <p class="nav-label" style="margin-top: 20px;">SETTINGS</p>

        <router-link to="/settings" custom v-slot="{ isActive, navigate }">
          <div :class="['nav-item', isActive && 'active']" @click="navigate">
            <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="8" cy="8" r="2.5"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>
            </svg>
            Settings
          </div>
        </router-link>
      </div>

      <!-- User footer -->
      <template #append>
        <div class="sidebar-footer">
          <div class="user-row">
            <div class="user-avatar">AP</div>
            <div>
              <div class="user-name"> Surabhi </div>
              <div class="user-role">OWNER</div>
            </div>
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Topbar -->
    <v-app-bar flat height="52" class="topbar" border="b">
      <div class="topbar-right">
        <div class="status-pill">
          <div class="status-dot" />
          <span class="status-text">LIVE</span>
        </div>

        <!-- Theme toggle -->
        <v-btn
          icon
          size="small"
          variant="outlined"
          class="icon-btn"
          @click="toggleTheme"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <v-icon size="16">
            {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
          </v-icon>
        </v-btn>

        <v-btn icon size="small" variant="outlined" class="icon-btn">
          <v-icon size="16">mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon size="small" variant="outlined" class="icon-btn">
          <v-icon size="16">mdi-cog-outline</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Page content -->
    <v-main class="main-content">
      <div class="page-inner">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>

<!-- <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.sidebar {
  background: #13161d !important;
  border-right: 1px solid rgba(255, 255, 255, 0.07) !important;
}

/* Logo */
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.logo-mark {
  width: 34px; height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, #f5a623 0%, #e8870d 100%);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(245,166,35,0.3), 0 4px 12px rgba(245,166,35,0.15);
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.logo-dev {
  font-family: 'Space Mono', monospace;
  font-size: 13px; font-weight: 700;
  color: #e8eaf0;
  letter-spacing: -0.02em;
}
.logo-insight {
  font-family: 'Space Mono', monospace;
  font-size: 13px; font-weight: 700;
  color: #f5a623;
  letter-spacing: -0.02em;
}

/* Nav */
.nav-section {
  padding: 14px 10px;
  flex: 1;
}
.nav-label {
  font-size: 9px;
  font-family: 'Space Mono', monospace;
  color: #5f6478;
  letter-spacing: 0.12em;
  padding: 0 8px;
  margin-bottom: 6px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #5f6478;
  transition: background 0.15s, color 0.15s;
  margin-bottom: 2px;
  user-select: none;
}
.nav-item:hover {
  background: #1a1e28;
  color: #e8eaf0;
}
.nav-item.active {
  background: rgba(245, 166, 35, 0.1);
  color: #f5a623;
}
.nav-icon {
  width: 16px; height: 16px;
  opacity: 0.7; flex-shrink: 0;
}
.nav-item.active .nav-icon { opacity: 1; }
.nav-badge {
  margin-left: auto;
  font-size: 9px;
  font-family: 'Space Mono', monospace;
  background: rgba(245, 166, 35, 0.15);
  color: #f5a623;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Sidebar footer */
.sidebar-footer {
  padding: 12px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.user-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}
.user-row:hover { background: #1a1e28; }
.user-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(245, 166, 35, 0.12);
  border: 1px solid rgba(245, 166, 35, 0.3);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 10px; font-weight: 700;
  color: #f5a623; flex-shrink: 0;
}
.user-name {
  font-size: 12px; font-weight: 500; color: #e8eaf0;
}
.user-role {
  font-size: 10px;
  font-family: 'Space Mono', monospace;
  color: #5f6478;
}

/* Topbar */
.topbar {
  background: #13161d !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;
}
.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}
.breadcrumb-root { color: #5f6478; }
.breadcrumb-sep { color: #5f6478; }
.breadcrumb-page { font-weight: 500; color: #e8eaf0; }
.topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.status-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(62, 207, 142, 0.08);
  border: 1px solid rgba(62, 207, 142, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
}
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #3ecf8e;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.status-text {
  font-size: 11px;
  font-family: 'Space Mono', monospace;
  color: #3ecf8e;
}
.icon-btn {
  border-color: rgba(255, 255, 255, 0.07) !important;
  color: #5f6478 !important;
}
.icon-btn:hover {
  border-color: rgba(255, 255, 255, 0.15) !important;
  color: #e8eaf0 !important;
}

/* Main */
.main-content {
  background: #0d0f14 !important;
}
.page-inner {
  padding: 24px;
  max-width: 1400px;
} -->

<style scoped>
.sidebar {
  background: rgb(var(--v-theme-surface)) !important;
  border-right: 1px solid rgba(var(--v-border-color), 0.07) !important;
}
.logo-area {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.07);
}
.nav-item:hover {
  background: rgba(var(--v-border-color), 0.05);
  color: rgb(var(--v-theme-on-surface));
}
.nav-label {
  color: rgba(var(--v-theme-on-surface), 0.4);
}
.nav-item {
  color: rgba(var(--v-theme-on-surface), 0.45);
}
.sidebar-footer {
  border-top: 1px solid rgba(var(--v-border-color), 0.07);
}
.user-row:hover {
  background: rgba(var(--v-border-color), 0.05);
}
.user-name {
  color: rgb(var(--v-theme-on-surface));
}
.user-role {
  color: rgba(var(--v-theme-on-surface), 0.4);
}
.topbar {
  background: rgb(var(--v-theme-surface)) !important;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.07) !important;
}
.breadcrumb-root {
  color: rgba(var(--v-theme-on-surface), 0.4);
}
.breadcrumb-sep {
  color: rgba(var(--v-theme-on-surface), 0.4);
}
.breadcrumb-page {
  color: rgb(var(--v-theme-on-surface));
}
.icon-btn {
  border-color: rgba(var(--v-border-color), 0.12) !important;
  color: rgba(var(--v-theme-on-surface), 0.5) !important;
}
.icon-btn:hover {
  color: rgb(var(--v-theme-on-surface)) !important;
}
.main-content {
  background: rgb(var(--v-theme-background)) !important;
}

/* Keep logo-mark, logo-dev, logo-insight, status-pill, nav-badge hardcoded
   since they are brand colors that don't change with theme */
.logo-mark {
  width: 34px; height: 34px; border-radius: 9px;
  background: linear-gradient(135deg, #f5a623 0%, #e8870d 100%);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(245,166,35,0.3), 0 4px 12px rgba(245,166,35,0.15);
}
.logo-dev {
  font-family: 'Space Mono', monospace;
  font-size: 13px; font-weight: 700; letter-spacing: -0.02em;
  color: rgb(var(--v-theme-on-surface));
}
.logo-insight {
  font-family: 'Space Mono', monospace;
  font-size: 13px; font-weight: 700; letter-spacing: -0.02em;
  color: #f5a623;
}
.logo-area {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 16px 14px;
}
.logo-text {
  display: flex; flex-direction: column; line-height: 1.15;
}
.nav-section { padding: 14px 10px; }
.nav-label {
  font-size: 9px; font-family: 'Space Mono', monospace;
  letter-spacing: 0.12em; padding: 0 8px; margin-bottom: 6px;
}
.nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 10px; border-radius: 8px; cursor: pointer;
  font-size: 13px; font-weight: 500;
  transition: background 0.15s, color 0.15s;
  margin-bottom: 2px; user-select: none;
}
.nav-item.active {
  background: rgba(245, 166, 35, 0.1);
  color: #f5a623;
}
.nav-icon { width: 16px; height: 16px; opacity: 0.7; flex-shrink: 0; }
.nav-item.active .nav-icon { opacity: 1; }
.nav-badge {
  margin-left: auto; font-size: 9px;
  font-family: 'Space Mono', monospace;
  background: rgba(245, 166, 35, 0.15);
  color: #f5a623; padding: 2px 6px; border-radius: 4px;
}
.sidebar-footer { padding: 12px 10px; }
.user-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 8px; cursor: pointer;
  transition: background 0.15s;
}
.user-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(245, 166, 35, 0.12);
  border: 1px solid rgba(245, 166, 35, 0.3);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 10px; font-weight: 700; color: #f5a623; flex-shrink: 0;
}
.user-name { font-size: 12px; font-weight: 500; }
.user-role { font-size: 10px; font-family: 'Space Mono', monospace; }
.topbar-inner {
  display: flex; align-items: center;
  justify-content: space-between; width: 100%; padding: 0 20px;
}
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.topbar-right { display: flex; align-items: center; gap: 10px; }
.status-pill {
  display: flex; align-items: center; gap: 6px;
  background: rgba(62, 207, 142, 0.08);
  border: 1px solid rgba(62, 207, 142, 0.2);
  padding: 4px 10px; border-radius: 20px;
}
.status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #3ecf8e; animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.status-text {
  font-size: 11px; font-family: 'Space Mono', monospace; color: #3ecf8e;
}
.page-inner { padding: 24px; max-width: 1400px; }
</style>