<template>
  <div>
    <div class="grid gap-3 steps">
      <Component
        :is="step"
        v-for="(step, i) in steps"
        :key="i"

        @input="onInput(i, $event)"
      />
      <Panel
        header="Итоговый вброс:"
      >
        <pre class="text-wrap font-sans">{{ result }}</pre>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{
  steps: Component[]
}>()

const parts = ref<string[]>(Array.from(Array(props.steps.length)))

const onInput = (idx: number, text: string) => {
parts.value[idx] = text
}

const result = computed(() => parts.value.filter(p => p).join('\n\n'))
</script>

<style scoped>
.steps {
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
}
</style>