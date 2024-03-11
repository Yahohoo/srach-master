<template>
  <BasePage
    :steps
  />
</template>

<script setup lang="ts">
import DefenceOne from '~/components/defence/DefenceOne.vue';
import DefenceThree from '~/components/defence/DefenceThree.vue';
import DefenceTwo from '~/components/defence/DefenceTwo.vue';

definePageMeta({
  title: 'Оборонная промышленность'
})

const steps = [
  DefenceOne,
  DefenceTwo,
  DefenceThree
]
</script>