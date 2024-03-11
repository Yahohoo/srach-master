<template>
  <div class="p-6">
    <TabMenu
      :model="menuItems"
      :active-index="activeIndex"
    >
      <template #item="{ item, props }">
        <NuxtLink
          v-slot="{ href, navigate }"
          custom
          :to="item.route"
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
          >
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </NuxtLink>
      </template>
    </TabMenu>
    <div class="pt-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const menuItems = computed(() => router
  .getRoutes()
  .map((route) => ({ label: route.meta.title as string, route: route.path })))
const activeIndex = computed(() =>menuItems.value.findIndex((item) => item.route === router.currentRoute.value.path)  )
</script>
