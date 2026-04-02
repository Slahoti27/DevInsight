<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen bg-dark text-white">

    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 p-5 flex flex-col">
      <h1 class="text-2xl font-bold text-primary mb-8">DevInsight</h1>

      <nav class="space-y-2">
        <router-link
          to="/"
          class="block px-3 py-2 rounded-lg hover:bg-gray-800"
          active-class="bg-primary text-white"
        >
          📊 Dashboard
        </router-link>

        <router-link
          to="/repos"
          class="block px-3 py-2 rounded-lg hover:bg-gray-800"
          active-class="bg-primary text-white"
        >
          📦 Repositories
        </router-link>

        <router-link
          to="/contributors"
          class="block px-3 py-2 rounded-lg hover:bg-gray-800"
          active-class="bg-primary text-white"
        >
          👥 Contributors
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">

      <!-- Topbar -->
      <header class="h-16 bg-gray-800 flex items-center justify-between px-6 border-b border-gray-700">
        <h2 class="text-lg font-semibold">DevInsight Dashboard</h2>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-400">Welcome 👋</span>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>

  </div>
</template>