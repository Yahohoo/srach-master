<template>
  <BaseStep
    index="2"
    title="Определите уровень технологий"
  >
    <div class="flex flex-column flex-row justify-content-between gap-4 p-3">
      <div>
        <Listbox
          v-model="selectedTechno"
          :options="technoLevels"
          option-label="name"
          class="w-full md:w-14rem"
        />
      </div>
      <div>
        <BaseInputGroup>
          <BaseLabeledInput
            for="graphics"
            label="Мультики про ракеты"
          >
            <Checkbox
              v-model="graphics"
              input-id="graphics"
              binary
            />
          </BaseLabeledInput>
          <BaseLabeledInput
            for="analogs"
            label="Аналоговнет"
          >
            <Checkbox
              v-model="analogs"
              input-id="analogs"
              binary
            />
          </BaseLabeledInput>
        </BaseInputGroup>
      </div>
    </div>
    <template #preview>
      {{ result }}
    </template>
  </BaseStep>
</template>

<script setup lang="ts">
const technoLevels = [
  {
    name: 'Технологии 30-х годов',
    code: '30',
    text: 'по дневникам инженера из шарашки, который в 30-х пилил какой-нибудь двигатель на эфире, попробуют сделать очередное нерабочее говнище'
  },
  {
    name: 'Технологии 60-х годов',
    code: '60',
    text: 'поднимут архивы какого-нибудь НИИ за 60-е годы и попробуют восстановить достижения древней ушедшей цивилизации - безрезультатно, разумеется'
  },
  {
    name: 'Раскопали чертежи 70-х',
    code: 'de',
    text: 'откопают чертежи еще 70-х годов и попробуют за миллиарды денег восстановить то, для чего нет ни технической базы, ни цепочек производств, ни материалов - НИ ХУ Я'
  },
  {
    name: 'Спиздили у немцев в 80-х',
    code: 'de',
    text: 'попробуют таки поработать по чертежам, которые еще в 80-е спиздили в ФРГ. Результаты, понятное дело, предсказуемы'
  },
  {
    name: 'Купили у Китая',
    code: 'ch',
    text: 'переклеют пару шильдиков на списаных в Китае еще в нулевых ракетах и купленых за копейки'
  },
]

const graphics = ref(false)
const analogs = ref(false)

const emits = defineEmits<{ input: [string] }>()

const selectedTechno = ref<typeof technoLevels[number]>()

const graphicsText = `Мультики от президента в 2018 все посмотрели - а где реальный результат? Вот именно, нет нихуя.`
const analogsText = `Понятное дело, у нас-то всегда все "самое лучшее", аналоговнет, противники трепещут (опустим детали, что это только на бумаге).`


const result = computed(() => {
  const parts = []
  if (selectedTechno.value) {
    parts.push(`На остатки денег дай боже хотя бы ${selectedTechno.value.text}.`)
  }
  
  if (graphics.value) {
    parts.push(graphicsText)
  }

  if (analogs.value) {
    parts.push(analogsText)
  }

  const joined =  parts.join(' ')

  return joined 
})

watchEffect(() => emits('input', result.value))
</script>
