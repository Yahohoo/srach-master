<template>
  <div class="flex items-center">
    <slot />
    <label
      :for="props.for"
      class="ml-2"
    >{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  for: string,
  label: string
}>()
</script>