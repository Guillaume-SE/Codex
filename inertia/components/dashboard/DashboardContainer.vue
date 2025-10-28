<script setup lang="ts">
import DashboardNavigation from '~/components/dashboard/DashboardNavigation.vue'
</script>

<template>
  <div class="dashboard-container">
    <h3>Dashboard</h3>
    <div class="dashboard-content">
      <DashboardNavigation />
      <div class="dashboard-content-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  width: 80%;
  margin: auto;
  padding-top: 50px;
}
.dashboard-content {
  display: flex;
}
.dashboard-content-container {
  min-width: 800px;
  flex-grow: 1;
}
</style>
