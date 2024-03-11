<template>
  <BaseStep
    index="1"
    title="Укажите информацию о себе"
  >
    <div class="flex flex-row justify-content-between gap-4 p-3">
      <div>
        Я <Dropdown
          v-model="gender"
          :options="genders"
          option-label="name"
        /> школу в <InputNumber
          v-model="year"
          :min="1900"
          :max="2010"
        /> году.
      </div>
      <div>
        <BaseLabeledInput
          for="badMarks"
          label="Низкие оценки"
        >
          <Checkbox
            v-model="badMarks"
            input-id="badMarks"
            binary
          />
        </BaseLabeledInput>
      </div>
    </div>
    <template #preview>
      {{ result }}
    </template>
  </BaseStep>
</template>

<script setup lang="ts">
const emits = defineEmits<{ input: [string] }>()

const genders = [
  {
    name: 'закончил',
    meta: {
      answered: 'ответил'
    }
  },
  {
    name: 'закончила',
    meta: {
      answered: 'ответила'
    }
  },
]

const gender = ref(genders[0])
const year = ref(1900)
const diff = computed(() => new Date().getFullYear() - year.value)
const diffForm = computed(() => pluralize(diff.value, { one: 'год', two: 'года', many: 'лет' }))

const badMarks = ref(false)

const result = computed(() => `Я ${
  gender.value.name
} школу в ${
  year.value
} году, ${
  diff.value
} ${
  diffForm.value
} назад, ${badMarks.value ? 'с тройками в аттестате ' : ''}но правильно ${
  gender.value.meta.answered
} на все вопросы.`)

watchEffect(() => emits('input', result.value))
</script>
