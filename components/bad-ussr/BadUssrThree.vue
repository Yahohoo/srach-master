<template>
  <BaseStep
    index="3"
    title="Определите масштабы расстрелов"
  >
    <div class="flex flex-col gap-4 p-3">
      <Chart
        type="line"
        :options="chartOptions"
        :data="chartData"
        :width="500"
        :height="300"
      />
      
      <div class="flex flex-col gap-3">
        <label>
          Усилить масштабы расстрелов
        </label>
        <Slider
          v-model="repressionCoef"
          :min="3"
          :max="10"
        />
      </div>
    </div>
    <template #preview>
      {{ result }}
    </template>
  </BaseStep>
</template>

<script setup lang="ts">
import Chart  from 'primevue/chart' 

const emits = defineEmits<{ input: [string] }>()

onMounted(() => {
    watchEffect(setChartData);
    setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const repressionCoef = ref(3)
const baseRepressionRate = 0.1


const getRepressedAmplifier = () => {
  let repressed = baseRepressionRate

  return () => {
    repressed = repressed * repressionCoef.value

    return repressed
  }
}

const repressions = computed(() => {
  const amplifier = getRepressedAmplifier()

  const data = [
  {
    year: '1926',
    total: 147,
    repressed: amplifier(),
  },
  {
    year: '1939',
    total: 170,
    repressed: amplifier(),
  },
  {
    year: '1940',
    total: 194,
    repressed: amplifier(),
  },
  {
    year: '1950',
    total: 179,
    repressed: amplifier(),
  },
  {
    year: '1951',
    total: 181,
    repressed: amplifier(),
  },
  {
    year: '1952',
    total: 185,
    repressed: amplifier(),
  },
]

return data
})

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    chartData.value = {
        labels: repressions.value.map(rep => rep.year),
        datasets: [
            {
                label: 'Население СССР, млн. ч.',
                data: repressions.value.map(rep => rep.total),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--cyan-500')
            },
            {
                label: 'Количество расстреляных, млн. ч.',
                data: repressions.value.map(rep => rep.repressed),
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--red-500')
            },
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    chartOptions.value = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

const result = computed(() => {
  const head = repressions.value?.at(-1)
  const totalRepressed = repressions.value.reduce((acc, curr) => acc + curr.repressed, 0)

  return `Масштабы репрессий были ужасны, уже к ${head?.year} году было расстреляно порядка ${totalRepressed.toFixed(0)} млн. человек.`
})

watchEffect(() => emits('input', result.value))
</script>
