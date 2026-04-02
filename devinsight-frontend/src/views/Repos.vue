<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-800 p-4 rounded-xl shadow">
        <p>Total Commits</p>
        <h2 class="text-xl font-bold">1200</h2>
      </div>

      <div class="bg-gray-800 p-4 rounded-xl shadow">
        <p>PRs</p>
        <h2 class="text-xl font-bold">320</h2>
      </div>

      <div class="bg-gray-800 p-4 rounded-xl shadow">
        <p>Contributors</p>
        <h2 class="text-xl font-bold">12</h2>
      </div>
    </div>
  </MainLayout>
</template>