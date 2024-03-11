<template>
  <BaseInputGroup>
    <BaseLabeledInput
      v-for="item in items"
      :key="item.id"
      :for="item.id"
      :label="item.label"
    >
      <Checkbox
        v-model="model"
        :input-id="item.id"
        :value="item.text"
      />
    </BaseLabeledInput>
  </BaseInputGroup>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: Array<{ id: string, label: string, text: string  }>
}>()
const model = defineModel<string[]>({ required: true })
</script>
