import {defineStore} from 'pinia';
import { ref } from 'vue';
import Swal from 'sweetalert2'


export const useMarketStore = defineStore("market", () => {
        const cart = ref([]);
const totalCart = ref(null);
const ptrigger = ref(0);
const order = ref([]);
const totalcancelled = ref(0);
const nonsold = ref(null);
const paymethod = ref('nequi');
const npurchased = ref(0);
const totalsales = ref(null);
const userinput = ref('');
const passinput = ref('');
const employees = ref([
    {id: '1234', charge: 'Cocinero', password: '12345678'},
    {id: '5678', charge: 'Mesero', password: '87654321'},
    {id: '3333', charge: 'Admin', password: '3333'},
]);
const modaltrigger = ref(0);
const logspan = ref(0);

const cards = ref([
    {
        name: "pepe",
        number: "12345678",
        date: "2028-05-10",
        cvv: "562",
        balance: 100000

    },
    {
        name: "juanito",
        number: "87654321",
        date: "2027-05-10",
        cvv: "352",
        balance: 250000

    }
]);

const wallets = ref([

    {
        name: "pepe",
        number: "3103333333",
        balance: 80000
    },
    {
        name: "juanit",
        number: "3101111111",
        balance: 10000
    },


])
    
const minusbtn = (item) => {
        if (item.order_amount > 0) {
            item.order_amount -= 1;
            localStorage.setItem(`order_amount_${item.id}`,item.order_amount);
        } 
        
    }
const plusbtn = (item)=> {
        if (item.order_amount < 20) {
            item.order_amount += 1;
            localStorage.setItem(`order_amount_${item.id}`,item.order_amount);
        } 
}



const addToCart = (item) => {

        if(item.order_amount > 0 && item.order_amount < 20) {
            
            cart.value.push({
                img: item.img,
                prod: item.name,
                qty: item.order_amount,
                price: item.price,
            });

            /*acc -> accumulator; cv -> current value*/
            cart.value = cart.value.reduce((acc, cv) => {
                const elementExists = acc.find(e => e.prod === cv.prod);
                if (elementExists) {
                return acc.map((e) => {
                    if (e.prod === cv.prod) {
                    return {
                        ...e,
                        qty: e.qty + cv.qty
                    }
                    }
                    return e;
                });
                }
                return [...acc, cv];
            }, []);


            alert(`Se agregaron ${item.order_amount} ${item.name} al carrito`);
            item.order_amount = 1;

            uploadCart();

        }else{
            alert('Debe agregar mínimo un producto');
        }
    }

const uploadCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    }

    const loadCart = () => {
        cart.value = JSON.parse(localStorage.getItem('cart')) || []
    }
    
    const uploadOrder = () =>{
        localStorage.setItem('order', JSON.stringify(order.value));
    }

    const loadOrder = () => {
        order.value = JSON.parse(localStorage.getItem('order')) || [];
    }

    const cartClick = () => {
        if (cart.value.length > 0) {
            const total = cart.value.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
           totalCart.value = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
        }
        uploadCart();
    }

    const payments = () => {
            if (cart.value.length > 0) {
                ptrigger.value = 1;
            }else{
                alert('El carrito está vacío, por favor agregue al menos un producto');
            }
            uploadCart();
            
    }

    const cancelpurchase = () => {
        if (confirm("¿Esta seguro de que desea cancelar su compra?") === true){
            const totalc = cart.value.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
            order.value.push({
                id: order.value.length + 1,
                order: [],
                status: "Cancelado",
                totalp: 0,

                totalc: totalc,
            });

            const prodqty = cart.value.map(e => {
                return{
                    prod: e.prod,
                    qty: e.qty
                }
            });

            order.value[order.value.length - 1].order = prodqty;
            if (order.value[order.value.length - 1].statusAdmin === 'Cancelado') {
                totalcancelled.value += 1;
            }
            const sumtotals = order.value.map(element => element.totalc).reduce((a, b) => a + b, 0);
            nonsold.value = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(sumtotals);
            alert('Su compra fue cancelada satisfactoriamente');
            cancel();
        }
        uploadCart();
    }
    
    const validatePayment = (pay) => {
        let message = "El pago ha sido rechazado, los datos son incorrectos";
        let icon = "error";
        let title = "Oops..."
        const num = totalCart.value.replace(/[^\d.-]/g, '');
        const total = parseFloat(num.replace(".", ""));
        console.log(total)
        pay.number = pay.number.toString();
        pay.date = pay.date.toString();
        pay.cvv = pay.cvv.toString();
        console.log(pay, paymethod.value)
        if(paymethod.value === "nequi"){
            wallets.value.forEach(w => {
                console.log(w);
                if(w.name === pay.name && w.number === pay.number){
                    console.log('holaaa')
                    if(total <= w.balance){
                            icon = 'success';
                            title = "Felicitaciones"
                            message = 'Se ha realizado el pago correctamente';

                            w.balance -= total
                            sendorder();
                    }
                    else{
                            icon = 'error';
                            title= 'Oops...';
                            message ='El saldo es insuficiente';
                        
                    }
                    
                }
            });
        }
        else{
            cards.value.forEach(c => {
                console.log(c)
                if(c.name === pay.name && c.number === pay.number && c.date == pay.date && c.cvv === pay.cvv){
                    console.log('hey')
                    if(total <= c.balance){
                        icon = 'success';
                            title = "Felicitaciones"
                            message = 'Se ha realizado el pago correctamente';
                            c.balance -= total
                            sendorder();
                    }
                    else{
                        icon = 'error';
                            title= 'Oops...';
                            message ='El saldo es insuficiente';
                    }
                }
            });
        }
        
        Swal.fire({
            icon: (icon === 'success') ? 'success' : 'error',
            title: title,
            text: message,
          });

    }

    const sendorder = () => {
        
        if (cart.value.length > 0) {
                const totalp = cart.value.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
                order.value.push({
                    id: order.value.length + 1,
                    order: [],
                    status: "Pagado",
                    totalp: totalp,
                   
                    totalc: 0,
                });
                
                const prodqty = cart.value.map(e => {
                    return{
                        prod: e.prod,
                        qty: e.qty
                    }
                });

                order.value[order.value.length - 1].order = prodqty;
                const sumtotals = order.value.map(element => element.totalp).reduce((a, b) => a + b, 0);
                totalsales.value = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(sumtotals);
                
                alert('Tu pedido se está preparando, lo recibirás muy pronto');
                cancel();
           
        }else{
            alert('No hay productos en el carrito, por favor agregue al menos uno');
        }
        uploadCart();
        uploadOrder();
    }

    const delFromCart = (index) => {
        cart.value.splice(index, 1);
        const total = cart.value.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
        totalCart.value = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
        uploadCart();
    }

    const selectPayment = () => {
     
        if(paymethod.value === "nequi"){
            ptrigger.value = 2;
        }
        else{
            ptrigger.value = 3;
        }
    }

    const cancel = () => {
        if (cart.value.length > 0) {
            cart.value.splice(0, cart.value.length);
            const total = cart.value.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
            totalCart.value = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
            //alert('Su pedido fue cancelado satisfactoriamente');
            ptrigger.value = 0;
            paymethod.value = '';
        }else{
            alert('No hay productos en el carrito, por favor agregue al menos uno');
            const total = cart.value.map(element => element.price * element.qty).reduce((a, b) => a + b, 0);
            totalCart.value = new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(total);
        }
        uploadCart();
        uploadOrder();
    }

    const login = () => {

        if (userinput.value.length > 0 && passinput.value.length > 0) {
            const index = employees.value.findIndex((object) => {
                return object.id == userinput.value;
            });

            if(index != -1 && passinput.value === employees.value[index].password){
                modaltrigger.value = 1;
                logspan.value = 0;
            }else{
                logspan.value = 1;
            }
        }else{
            logspan.value = 2;
        }

    }
    const closelogin = () => {
        logspan.value = 0;
        userinput.value = '';
        passinput.value = '';
    }
    const chefbtn = (index) => {
        console.log("preparado",  order.value[index], index);
        order.value[index].status = 'Preparado';
        uploadOrder();
    }
    const waiterbtn = (index) => {
        order.value[index].status = 'Entregado';
        uploadOrder();
    }
    const logout = () => {
        if (confirm("¿Esta seguro de que desea cerrar sesión?") === true){
            modaltrigger.value = 0;
            logspan.value = 0;
            userinput.value = '';
            passinput.value = '';
        }
    }

  
    return {
        minusbtn,
        plusbtn,
        addToCart,
        cartClick,
        payments,
        cart,
        cancelpurchase,
        sendorder,
        delFromCart,
        loadCart,
        login,
        cancel,
        closelogin,
        chefbtn,
        waiterbtn,
        logout,
        userinput,
        passinput,
        employees,
        modaltrigger,
        logspan,
        ptrigger,
        totalCart,
        paymethod,
        order,
        totalsales,
        nonsold,
        npurchased,
        totalcancelled,
        selectPayment,
        validatePayment,
        loadOrder

        


     
    };
  });