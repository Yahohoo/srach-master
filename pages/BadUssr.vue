<template>
  <BasePage
    :steps
  />
</template>

<script setup lang="ts">
import BadUssrOne from '~/components/bad-ussr/BadUssrOne.vue';
import BadUssrThree from '~/components/bad-ussr/BadUssrThree.vue';

definePageMeta({
  title: 'Плохой Совок'
})

const steps = [
  BadUssrOne,
  BadUssrThree,
]
</script>