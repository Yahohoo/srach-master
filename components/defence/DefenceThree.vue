<template>
  <BaseStep
    index="3"
    title="Определите пропорции"
  >
    <div class="flex flex-column flex-row justify-content-between gap-4 p-3">
      <div>
        <Chart
          type="pie"
          :data="chartData"
          :options="chartOptions"
          :height="200"
          :width="200"
          class="w-full md:w-30rem"
        />
      </div>
      <div class="flex flex-col gap-4">
        <InputGroup
          v-for="proportion in proportions"
          :key="proportion.label"
          class="w-full"
        >
          <InputGroupAddon>{{ proportion.label }}</InputGroupAddon>
          <InputNumber
            v-model="proportion.value"
            :max="100"
            :min="0"
            :max-fraction-digits="0"
          />
          <InputGroupAddon>%</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
    <template #preview>
      {{ result }}
    </template>
  </BaseStep>
</template>

<script setup lang="ts">
import Chart  from 'primevue/chart' 

const chartData = ref();
const chartOptions = ref({
        plugins: {
            legend: {
                display: false,
            }
        },
    });

const proportions = reactive([
  {
    label: 'I. Продадим индусам',
    value: 30,
    color: '--cyan-600',
    text: (val: number) => `даст бог, ${val}% уйдет индусам за копейки`
  },
  {
    label: 'II. Заменим на надувные',
    value: 30,
    color: '--teal-600',
    text: (val: number) => `по старой традиции ${val}% заменим на надувные`
  },
  {
    label: 'III. Заменим на китайские',
    value: 30,
    color: '--gray-600',
    text: (val: number) => `на остатки остатков денег ${val}% заменим на китайское`
  },
  {
    label: 'IV. Оставим себе',
    value: 10,
    color: '--yellow-600',
    text: (val: number) => `ну и для отчетности оставшиеся ${val} процентов оставим себе`
  },
  
])

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    chartData.value = {
        labels: proportions.map(prop => prop.label),
        datasets: [
            {
                data: proportions.map(prop => prop.value),
                backgroundColor: proportions.map(prop => documentStyle.getPropertyValue(prop.color)),
            }
        ]
    };
};
onMounted(() => {
  watchEffect(setChartData)
});

const emits = defineEmits<{ input: [string] }>()

const result = computed(() => {
  const base = `И когда в итоге нихуя не будет работать и жопы загорятся, будет примерно такая хуйня: `
  const values = proportions.map(prop => prop.text(prop.value)).join(', ')
  return base + values + '.'
})

watchEffect(() => emits('input', result.value))
</script>
