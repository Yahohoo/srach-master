<template>
  <Panel :header="header">
    <slot />
    <template
      v-if="false"
      #footer
    >
      <p class="pt-2">
        <slot name="preview" />
      </p>
    </template>
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number | string,
  title: string
}>()

const header = computed(() => `Шаг ${props.index}. ${props.title}:`)
</script>
