<!-- <template>
  <div class="drawer drawer-end h-full">
    <input id="filter-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex h-full flex-col">
      <slot />
    </div>

    <div class="drawer-side z-[100]">
      <label for="filter-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

      <div class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-bold">Filtres</h3>
          <label
            for="filter-drawer"
            aria-label="close-sidebar"
            class="btn btn-sm btn-circle btn-ghost"
            >✕</label
          >
        </div>

        <slot name="sidebar" />
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="drawer drawer-end h-full">
    <input id="filter-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex h-full flex-col">
      <slot />
    </div>
    <div class="drawer-side z-[100]">
      <label for="filter-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

      <div class="bg-base-200 text-base-content flex h-full max-h-screen w-80 flex-col">
        <div class="flex-none p-4">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-xl font-bold">Filtres</h3>
            <label
              for="filter-drawer"
              aria-label="close-sidebar"
              class="btn btn-sm btn-circle btn-ghost"
              >✕</label
            >
          </div>
        </div>

        <div class="flex-auto overflow-y-auto p-4 pt-0"><slot name="sidebar" /></div>

        <div class="border-base-300 flex-none border-t p-4"><slot name="footer-action" /></div>
      </div>
    </div>
  </div>
</template>
