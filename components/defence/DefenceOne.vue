<template>
  <BaseStep
    index="1"
    title="Определите величину попила"
  >
    <div class="flex flex-row justify-content-between gap-4 p-3">
      <div>
        <Slider
          v-model="value"
          :max="120"
          :min="50"
          class="w-48"
        />
      </div>
      <div>
        <BaseInputGroup>
          <BaseLabeledInput
            v-for="currency in currencies"
            :key="currency.key"
            :for="currency.key"
            :label="currency.name"
          >
            <RadioButton
              v-model="selectedCurrency"
              :input-id="currency.key"
              name="dynamic"
              :value="currency.key"
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
type Currency = 'usd' | 'rub'

const currencies = [
  { key: 'usd', name: 'Откаты в USD' },
  { key: 'rub', name: 'Откаты в рублях' }
]


const emits = defineEmits<{ input: [string] }>()

const selectedCurrency = ref<Currency>('usd')
const value = ref(50)

const money = {
  'usd': 'осядет на счете нужных людей где-нибудь в условной Швейцарии',
  'rub': 'будет пылиться в кладовке на даче какого-нибудь генерала'
}

const result = computed(() => `Сколько на военку не выделяй - все попилят. От выделенных денег минимум ${value.value}% ${money[selectedCurrency.value]}.`)

watchEffect(() => emits('input', result.value))
</script>
