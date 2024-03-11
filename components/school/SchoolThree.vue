<template>
  <BaseStep
    index="3"
    title="Сформулируйте претензии"
  >
    <div class="flex flex-row justify-content-between gap-4 p-3">
      <div>
        Обвинить: <Dropdown
          v-model="blameOn"
          :options="blameOnOptions"
          option-label="name"
        /> в <Dropdown
          v-model="problem"
          :options="problems"
          option-label="name"
        />
        <div>
          Уровень праведного гнева: <Slider
            v-model="anger"
            :min="1"
            :max="4"
          />
        </div>
      </div>
      <BaseCheckboxGroup
        v-model="additional"
        :items="additionalOptions"
      />
    </div>
    <template #preview>
      {{ result }}
    </template>
  </BaseStep>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';

const emits = defineEmits<{ input: [string] }>()

const baseBlameOnOptions = [
  {
    name: 'Сороса',
    text: 'Cоросу'
  },
  {
    name: 'Реформы',
    text: 'реформам образования'
  },
  {
    name: 'Грефа',
    text: 'Грефу'
  },
  {
    name: 'Америку',
    text: 'западной программе дибилизации населения'
  },
]

const blameOnOptions = [
  ...baseBlameOnOptions,
  {
    name: 'Всех',
    text: baseBlameOnOptions.map(opt => opt.text).join(', ')
  }
]

const blameOn = ref(blameOnOptions[0])

const problems = [
  {
    name: 'Отуплении молодежи',
    text: 'отупление нашей молодежи'
  },
  {
    name: 'Уничтожении остатков образования',
    text: 'уничтожение тех крох наследия великой страны, которые мы сумели как-то сохранить'
  },
]

const problem = ref(problems[0])

const additionalOptions = [
  {
    label: 'Приплести политику',
    text: 'Видимо, такой электорат нужен властям, стадо проще контролировать',
    id: nanoid()
  },
  {
    label: 'Испугаться за себя',
    text: 'Не дай боже таким неучам пойти во врачи или инженеры',
    id: nanoid()
  },
  {
    label: 'ЕГЭ 😡',
    text: 'Одним словом - поколение ЕГЭ',
    id: nanoid()
  },
]

const additional = ref([])


const anger = ref(1)

const result = computed(() => {
  const base = `Cпасибо ${blameOn.value.text} за ${problem.value.text}`
  const extra = additional.value.join('. ')
  const exclamation = '!'.repeat(anger.value)
  return compactJoin([base, extra]) + exclamation
})

watchEffect(() => emits('input', result.value))
</script>
