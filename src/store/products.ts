import {defineStore} from 'pinia';
import { ref } from 'vue';

import axios from "axios";

export const useProductStore = defineStore("Products", () => {
    const productos = ref();
    const hb = ref([]);
    const hd = ref([]);
    const other = ref([]);

    const url = "http://localhost:3309/api/v1/products";
    const listProd =async () => {
        
        await axios
          .get(url)
          .then((response) => {
            const data = response.data.products;
            productos.value = data;
            productos.value.map(prod=>{
            const order_amount = parseInt(localStorage.getItem(`order_amount_${prod.id}`))  || 1; 
              if( prod.type.id ==1){
                const buger = {
                  ...prod,
                  idModal: `#hb${prod.id}`,
                  idUser:`hb${prod.id}`,
                  order_amount:order_amount
  
                }
                hb.value.push(buger)
              }else if(prod.type.id==3){
                const hotdog = {
                  ...prod,
                  idModal: `#hd${prod.id}`,
                  idUser:`hd${prod.id}`,
                  order_amount:order_amount
                }
                hd.value.push(hotdog)
              }
              else{
                const o = {
                    ...prod,
                    idModal: `#o${prod.id}`,
                    idUser:`o${prod.id}`,
                    order_amount:order_amount
                }

                other.value.push(o);
              }
            })
  
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
  
    return {
        listProd,
        hd, 
        hb,
        other
    };
  });