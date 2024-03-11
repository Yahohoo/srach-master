<template>
  <BasePage
    :steps
  />
</template>

<script setup lang="ts">
import SchoolOne from '~/components/school/SchoolOne.vue';
import SchoolThree from '~/components/school/SchoolThree.vue';
import SchoolTwo from '~/components/school/SchoolTwo.vue';

definePageMeta({
  title: 'Школьные вопросы'
})

const steps = [
  SchoolOne,
  SchoolTwo,
  SchoolThree
]
</script>