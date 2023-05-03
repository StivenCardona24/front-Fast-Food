<template>
  <router-view/>

</template>


<script setup lang="ts">

import { useProductStore } from '@/store/products';
import { useMarketStore } from './store/market';
import { onMounted } from 'vue';

const ProductsStore = useProductStore();
const MarketStore = useMarketStore();

const {listProd} = ProductsStore;
const {loadCart, loadOrder} = MarketStore;

onMounted(() => {
  listProd();
  loadCart();
  loadOrder();
})

</script>



<style lang="scss">
body{
    background-color: #191919;
}
</style>
