<template>
  <div class="bg-dark w-1/3 p-8 flex flex-wrap gap-4 content-start">
    <Card title="Entrées" :color="5"></Card>
    <Card title="Plats" :color="2"></Card>
    <Card title="Desserts" :color="3"></Card>
    <Card title="Entrées" :color="4"></Card>
    <Card title="Plats" :color="5"></Card>
    <Card title="Desserts" :color="1"></Card>
    <Card title="Plats" :color="3"></Card>
    <Card title="Desserts" :color="2"></Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card
  },
})
export default class Order extends Vue {}
</script>
