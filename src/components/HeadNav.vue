<template>
    <header>
        <nav id="navbar" class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src="../assets/images/l1.png" alt="logo">
                    <span>Hot Durger's</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#hamburguers">Hamburguesas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#hotdogs">Perros Calientes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" data-bs-toggle="modal"
                                data-bs-target="#login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a @click="cartClick" class="nav-link text-highlightedd" href="#" data-bs-toggle="modal"
                                data-bs-target="#carrito">Carrito <i class="fas fa-shopping-cart"></i> <strong
                                    v-text="cart.length" class="text-light"></strong></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>


    <!-- Modal Carrito -->
    <section id="modals">
        <div class="modal fade" id="carrito" tabindex="-1" aria-labelledby="carrito" aria-hidden="true">

            <div class="modal-dialog" v-if="ptrigger === 0">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="carrito">Carrito</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4>Tu Pedido:</h4>
                        <div class="table-responsive">
                            <table class="table table-dark table-hover">
                                <thead class="text-center">
                                    <tr>
                                        <th>Producto</th>
                                        <th>Nombre</th>
                                        <th>cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center" v-if="cart.length">
                                    <tr v-for="(item, index) in cart" :key="item.id">
                                        <td><img :src="item.img" alt="product"></td>
                                        <td v-text="item.prod"></td>
                                        <td v-text="item.qty"></td>
                                        <td v-text="item.price"></td>
                                        <td><button @click="delFromCart(index)" class="btn btn-danger"><i
                                                    class="fas fa-backspace"></i></button></td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <td colspan="5" class="text-center">No hay pedidos agregados</td>
                                </tbody>
                            </table>
                        </div>
                        <h4 class="text-center"><strong>TOTAL:</strong> <span>$<strong v-text="totalCart"></strong></span>
                        </h4>
                    </div>
                    <div class="modal-footer">
                        <button @click="payments" type="button"><strong>Ir a pagar</strong></button>
                        <button @click="cancel" type="button" class="cancel" data-bs-dismiss="modal"
                            aria-label="Close"><strong>Cancelar</strong></button>
                    </div>
                </div>
            </div>
            <div id="pago" class="modal-dialog" v-else-if="ptrigger === 1">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="pago">Pagos</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center"><strong>SELECCIONA TU MÉTODO DE PAGO</strong></h4>
                        <div class="row text-center">
                            <div class="col-12 form-check form-check-inline mt-2 mb-2 mw-100">
                                <label class="radio-inline"> <input v-model="paymethod" type="radio" name="conv" id="conv"
                                        value="nequi" checked><img src="../assets/images/nequi.png" alt=""
                                        class="ms-2"></label>
                            </div>
                            <div class="col-12 form-check form-check-inline mt-2 mb-2">
                                <label class="radio-inline"> <input v-model="paymethod" type="radio" name="conv" id="conv"
                                        value="tarjeta"><img src="../assets/images/credit.png" alt="" class="ms-2"></label>
                            </div>
                        </div>
                        <h4 class="text-center"><strong>TOTAL A PAGAR: </strong><span><strong
                                    v-text="totalCart"></strong></span></h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="selectPayment" v-if="paymethod.length <= 0"><strong>Pagar
                                Pedido</strong></button>
                        <button type="button" @click="selectPayment" v-else><strong>Pagar Pedido</strong></button>
                        <button type="button" @click="cancelpurchase" class="cancel"><strong>Cancelar</strong></button>
                    </div>
                </div>
            </div>
            <div id="pago" class="modal-dialog" v-else-if="ptrigger === 2">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="pago">Información Nequi</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center"><strong>información Nequi</strong></h4>
                        <div class="row text-center">
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Ingrese el nombre</label>
                                <input type="text" class="form-control" id="formGroupExampleInput"
                                    placeholder="Ingrese su nombre" v-model="pay.name">
                            </div>
                            <div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Ingrese su número de cuenta</label>
                                <input type="number" class="form-control" id="formGroupExampleInput2"
                                    placeholder="Ingrese el numero de su nequi o daviplata" v-model="pay.number">
                            </div>
                        </div>
                        <h4 class="text-center"><strong>TOTAL A PAGAR: </strong><span><strong
                                    v-text="totalCart"></strong></span></h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="validatePayment(pay)" v-if="paymethod.length <= 0"><strong>Pagar
                                Pedido</strong></button>
                        <button type="button" @click="validatePayment(pay)" data-bs-dismiss="modal" aria-label="close"
                            v-else><strong>Pagar Pedido</strong></button>
                        <button type="button" @click="cancelpurchase" class="cancel"><strong>Cancelar</strong></button>
                    </div>
                </div>
            </div>
            <div id="pago" class="modal-dialog" v-else-if="ptrigger === 3">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="pago">Información Tajeta</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center"><strong>Información Tarjeta</strong></h4>
                        <div class="row text-center">
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Ingrese el nombre</label>
                                <input type="text" class="form-control" id="formGroupExampleInput"
                                    placeholder="Ingrese el nombre registrado en la tarjeta" v-model="pay.name">
                            </div>
                            <div class="mb-1">
                                <label for="formGroupExampleInput2" class="form-label">Ingrese el número de la
                                    tarjeta</label>
                                <input type="number" class="form-control" id="formGroupExampleInput2"
                                    placeholder="Ingrese el numero de la tarjeta" v-model="pay.number">
                            </div>
                            <div class="row g-3 mb-3">
                                <div class="col-sm-7">
                                    <label for="formGroupExampleInput2" class="form-label">Fecha de vencimiento</label>
                                    <input type="date" class="form-control" id="formGroupExampleInput2"
                                        placeholder="Ingrese la fecha" v-model="pay.date">
                                </div>
                                <div class="col-sm">
                                    <label for="formGroupExampleInput2" class="form-label">CVV</label>
                                    <input type="number" maxlength="4" class="form-control" id="formGroupExampleInput2"
                                        placeholder="Ingrese el numero de seguridad" v-model="pay.cvv">
                                </div>
                            </div>

                        </div>
                        <h4 class="text-center"><strong>TOTAL A PAGAR: </strong><span><strong
                                    v-text="totalCart"></strong></span></h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="validatePayment(pay)" v-if="paymethod.length <= 0"><strong>Pagar
                                Pedido</strong></button>
                        <button type="button" @click="validatePayment(pay)" data-bs-dismiss="modal" aria-label="close"
                            v-else><strong>Pagar Pedido</strong></button>
                        <button type="button" @click="cancelpurchase" class="cancel"><strong>Cancelar</strong></button>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <section id="modals">

        <!--Modal login-->
        <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <button @click="closelogin" type="button" class="btn btn-dark" data-bs-dismiss="modal"
                            aria-label="Close"><i class="fas fa-times"></i></button>
                        <button @click="logout" type="button" class="btn btn-dark logout" v-if="modaltrigger === 1">Logout
                            <i class="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                    <div class="modal-body" v-if="modaltrigger === 0">
                        <div class="sigIn-formulario text-center">
                            <h1 class="sigIn-title mb-3">Hot Durger's</h1>
                            <img src="../assets/images/l1.png" alt="Icono" class="sigIn-Icon ">
                            <div class="form-floating mb-4">
                                <input v-model="userinput" @keyup.enter="login" type="text" class="form-control"
                                    id="floatingUser" required>
                                <label for="floatingUser">USUARIO</label>
                            </div>
                            <div class="form-floating mb-4">
                                <input v-model="passinput" @keyup.enter="login" type="password" maxlength="8" minlength="8"
                                    class="form-control" id="floatingPassword" required>
                                <label for="floatingPassword">CONTRASEÑA</label>
                                <span v-if="logspan === 1"><strong class="text-danger">USUARIO Y O CONTRASEÑA
                                        INCORRECTOS</strong></span>
                                <span v-if="logspan === 2"><strong class="text-danger">POR FAVOR INGRESE UN USUARIO Y
                                        CONTRASEÑA</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body" v-if="modaltrigger === 1">
                        <h5 class="text-center"><strong>Seleccione su cargo</strong></h5>
                        <div class="row">
                            <div class="col-md-4 col-lg-4 mt-3 mb-4">
                                <div class="card" data-bs-toggle="modal" data-bs-target="#chef-table" @click="filterOrder('Pagado')">
                                    <img src="../assets/images/chef.jpg" class="card-img-top" alt="hb4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">CHEF</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-lg-4 mt-3 mb-4">
                                <div class="card" data-bs-toggle="modal" data-bs-target="#waiter-table" @click="filterOrder('Preparado')">
                                    <img src="../assets/images/mesero.jpg" class="card-img-top" alt="hb4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">MESERO</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-lg-4 mt-3 mb-4">
                                <div class="card" data-bs-toggle="modal" data-bs-target="#admin-table">
                                    <img src="../assets/images/administrador.jpg" class="card-img-top" alt="hb4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">ADMIN</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="login" type="button" v-if="modaltrigger === 0"><strong>INGRESAR</strong></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal login -->

        <!-- modal tabla chef -->
        <div class="modal fade" id="chef-table" tabindex="-1" aria-labelledby="chef-table" aria-hidden="true"
            v-if="modaltrigger === 1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="chef-table">Tabla-Chef</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4>Pedidos:</h4>
                        <div class="table-responsive">
                            <table class="table table-dark">
                                <thead class="text-center">
                                    <tr>
                                        <!-- <th>Pedido #</th> -->
                                        <th>Pedido</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center" v-if="newOrder.length">

                                    <tr v-for="item in newOrder" :key="item.id">
                                        <!-- v-if="item.statusAdmin === 'Pagado' && item.statusChef === 'Pendiente'" -->


                                        <!-- <td class="pt-5" v-text="item.id"></td> -->
                                        <td class="pt-5">
                                            <table class="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-ceter">
                                                    <tr v-for="(order, index) in item.order" :key="index">
                                                        <td v-text="order.prod"></td>
                                                        <td v-text="order.qty"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td class="pt-5" v-if="item.status === 'Pagado'"><span
                                                v-text="item.status" class="text-success"></span></td>
                                        <td class="pt-5" v-else><span><strong v-text="item.status"
                                                    class="text-danger"></strong></span></td>
                                        <td class="pt-5"><button @click="chefbtn(item.id-1)" class="btn btn-success">OK <i
                                                    class="fas fa-check"></i></button></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="back" data-bs-toggle="modal" data-bs-target="#login"><strong> Regresar
                            </strong></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal tabla chef -->

        <!-- modal tabla mesero -->
        <div class="modal fade" id="waiter-table" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            v-if="modaltrigger === 1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="exampleModalLabel">Tabla-Mesero</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4>Pedidos:</h4>
                        <div class="table-responsive">
                            <table class="table table-dark table-hover">
                                <thead class="text-center">
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center" v-if="newOrder.length">
                                    <tr v-for="item in newOrder" :key="item.id">
                                        <!-- v-if="item.statusAdmin === 'Pagado' && item.statusChef === 'Completado' && item.statusWaiter === 'Pendiente'" -->

                                        <td class="pt-5">
                                            <table class="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-ceter">
                                                    <tr v-for="(order, index) in item.order" :key="index">
                                                        <td v-text="order.prod"></td>
                                                        <td v-text="order.qty"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td class="pt-5" v-if="item.status === 'Entregado'"><span
                                                v-text="item.status" class="text-success"></span></td>
                                        <td class="pt-5" v-else><span><strong v-text="item.statusWaiter"
                                                    class="text-danger"></strong></span></td>
                                        <td class="pt-5"><button @click="waiterbtn(item.id-1)" class="btn btn-success">OK <i
                                                    class="fas fa-check"></i></button></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="back" data-bs-toggle="modal" data-bs-target="#login"><strong> Regresar
                            </strong></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal tabla mesero -->

        <!-- modal tabla admin -->
        <div class="modal fade" id="admin-table" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            v-if="modaltrigger === 1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title text-center" id="exampleModalLabel">Tabla-Admin</h5>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <h4>Pedidos:</h4>
                        <div class="table-responsive">
                            <table class="table table-dark table-hover">
                                <thead class="text-center">
                                    <tr>
                                        <th>Pedido</th>
                                        <th>Total Pagado</th>
                                        <th>Total Cancelado</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center" v-if="order.length">
                                    <tr v-for="item  in order" :key="item.id">
                                        <td>
                                            <table class="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-ceter">
                                                    <tr v-for="(order, index) in item.order" :key="index">
                                                        <td v-text="order.prod"></td>
                                                        <td v-text="order.qty"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td v-text="item.totalp"></td>
                                        <td v-text="item.totalc"></td>
                                        <td  v-if="item.status === 'cancelado'"><span><strong v-text="item.status"
                                                    class="text-danger"></strong></span></td>
                                        <td><span v-text="item.status"
                                                class="text-success"></span></td>
                                        
                                    </tr>
                                    <tr>
                                        <td colspan="1">Totales:</td>
                                        <td colspan="1" v-text="totalsales" class="text-success"></td>
                                        <td colspan="1" v-text="nonsold" class="text-danger"></td>
                                        <td colspan="1"> </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">Total Ordenes Concretadas:</td>
                                        <td colspan="2" v-text="npurchased" class="text-success"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">Valor Total Ventas:</td>
                                        <td colspan="2" v-text="totalsales" class="text-success"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">Total Ordenes Cancelados:</td>
                                        <td colspan="2" class="text-danger" v-text="totalcancelled"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">Valor Ventas No Concretadas:</td>
                                        <td colspan="2" class="text-danger" v-text="nonsold"></td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <td colspan="4" class="text-center">No hay pedidos agregados</td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="back" data-bs-toggle="modal" data-bs-target="#login"><strong> Regresar
                            </strong></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal tabla admin -->

    </section>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useMarketStore } from '@/store/market';


const MarketStore = useMarketStore();
const { cart, ptrigger, totalCart, paymethod, modaltrigger, userinput, passinput, logspan, order, totalsales, nonsold, npurchased, totalcancelled } = storeToRefs(MarketStore)
const { delFromCart, payments, cancel, cancelpurchase, cartClick, login, closelogin, logout, chefbtn, waiterbtn, selectPayment, validatePayment } = MarketStore;

const pay = ref({
    name: "",
    number: "",
    date: "",
    cvv: ""
});


const newOrder = ref([]);

const filterOrder = (filter) => {
    console.log('holaa' + filter + order.value)
    newOrder.value = order.value.filter(o => o.status == filter);
    newOrder.value.forEach(element => {
        console.log(element);
    });
}

defineComponent({
    name: 'HeadNav',

});

</script>