<template>
         <!-- products -->
         <section id="products" class="mt-4">
                <div class="container">
                    <div class="row">
                        <div class="col text-center text-uppercase">
                            <h1 class="menu-title" id="hamburguers">Carta </h1>
                        </div>
                    </div>
                    <!-- Products here -->
                    <!-- hamburgers -->
                    <div class="row" v-if="productos.length">
                        <div class="col-md-6 col-lg-3 mt-3 mb-4" v-for="(item) in productos" :key="item.id">
                            <div class="card" >
                                <img :src="item.img" class="card-img-top" alt="hb1" data-bs-toggle="modal" :data-bs-target="item.idModal">
                                <div class="card-body">
                                    <h5 class="card-title" v-text="item.name"></h5>
                                    <!-- <p class="card-text"><strong  v-text="item.description"></strong></p> -->
                                    <h4 class="text-center mb-3"><strong>$ </strong> <span><strong v-text="item.price"></strong></span></h4>
                                    <div class="row">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text bg-dark"><button @click="minusbtn(item)" type="button" class="btn btn-dark"><i class="fas fa-minus"></i></button></span>
                                            <input type="number" min="0" max="20" class="form-control" placeholder="Cantidad" v-model.number="item.order_amount">
                                            <span class="input-group-text bg-dark"><button @click="plusbtn(item)" type="button" class="btn btn-dark"><i class="fas fa-plus"></i></button></span>
                                        </div>
                                        <div class="btnadd"><button @click="addToCart(item)" type="button" class="col-12 btn btn-dark">Agregar</button></div>
                                    </div>
                                </div>
                            </div>
                            <!-- modals hamburguers -->
                            <div id="modals">
                                <div  class="modal fade" :id="item.idUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title text-center" id="exampleModalLabel" v-text="item.name"></h5>
                                                <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times"></i></button>
                                            </div>
                                            <div class="modal-body">
                                                <img :src="item.img" class="card-img-top" alt="hd4">
                                                <h4>Descripción:</h4>
                                                <p v-text="item.description"></p>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text bg-dark"><button @click="minusbtn(item)" type="button" class="btn btn-dark"><i class="fas fa-minus"></i></button></span>
                                                    <input type="number" min="0" max="20" class="form-control" placeholder="Cantidad" v-model.number="item.order_amount">
                                                    <span class="input-group-text bg-dark"><button @click="plusbtn(item)" type="button" class="btn btn-dark"><i class="fas fa-plus"></i></button></span>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button @click="addToCart(item)" type="button"><strong>AGREGRAR</strong></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /modals hamburguers -->
                        </div>
                    </div>
                    <!-- /hamburgers -->
                    
                   
                </div>
            </section>
</template>

<script setup lang="ts">

import { storeToRefs } from "pinia";

import {useMarketStore} from '@/store/market';
import { useProductStore } from '../store/products';

const ProductsStore = useProductStore();
const MarketStore = useMarketStore();
const {hb, hd, other, productos } = storeToRefs(ProductsStore)
const {addToCart,  minusbtn, plusbtn } = MarketStore;


</script>