<template>
     <!-- MAIN -->
     <section id="main">
                <div id="carousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-pause="false">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../assets/images/hb1.jpg" class="d-block w-100" alt="js">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/hb4.jpg" class="d-block w-100" alt="vuejs">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/hd1.jpg" class="d-block w-100" alt="nodejs">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/hd4.jpg" class="d-block w-100" alt="nodejs">
                        </div>
                        <div class="overlay">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col md-6 offset-md-6 text-center text-md-start">
                                        <h1>Las mejores hamburguesas y perros calientes</h1>
                                        <p class="d-none d-md-block">
                                            Productos realizados de manera 100% artesanal, con carne de la mas alta elección.
                                            Date el gusto y consiente a tu paladar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CarruselImg',
  props: {
    msg: String,
  },
});
</script>