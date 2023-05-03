<template>
  <div class="home">
    <HeadNav></HeadNav>
    <CarruselImg></CarruselImg>
    <Products></Products>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeadNav from '@/components/HeadNav.vue'; // @ is an alias to /src
import CarruselImg from '@/components/Carrusel.vue';
import Products from '@/components/ProductsSection.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeadNav,
    CarruselImg,
    Products
  },
});
</script>
