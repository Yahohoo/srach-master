<template>
  <BaseStep
    index="2"
    title="Укажите преимущества старой школы"
  >
    <div>
      <BaseInputGroup>
        <BaseLabeledInput
          v-for="(advantage) in advantages"
          :key="advantage.id"
          :for="advantage.id"
          :label="advantage.label"
        >
          <Checkbox
            v-model="advantage.value"
            :input-id="advantage.id"
            binary
          />
        </BaseLabeledInput>
      </BaseInputGroup>
    </div>
    <template #preview>
      {{ result }}
    </template>
  </BaseStep>
</template>

<script setup lang="ts">
const emits = defineEmits<{ input: [string] }>()

const advantages = reactive([
  {
    label: 'Интернета не было',
    text: 'У нас не было интернета, гаджетов, гугла. Приходилось ходить в библиотеку и все запоминать.',
    value: false,
    id: 'internet'
  },
  {
    label: 'Были экзамены по всем предметам',
    text: 'Нас учили на все 100, по всем предметам были экзамены и мы их прекрасно сдавали.',
    value: false,
    id: 'exams'
  },
  {
    label: 'Похвалить СССР',
    text: 'Недаром говорят, что в СССР было лучшее образование, только сейчас понятно стало, почему это правда.',
    value: false,
    id: 'ussr'
  },
])

const result = computed(() => advantages.filter(adv => adv.value).map(adv => adv.text).join(' '))

watchEffect(() => emits('input', result.value))
</script>
