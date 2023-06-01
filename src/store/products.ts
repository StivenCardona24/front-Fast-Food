import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from "sweetalert2";
import axios from "axios";

export const useProductStore = defineStore("Products", () => {
  const productos = ref([]);
  const hb = ref([]);
  const hd = ref([]);
  const other = ref([]);

  const search = ref("");

  const url = "http://localhost:3309/api/v1/products";
  const listProd = async () => {
    await axios
      .get(url)
      .then((response) => {
        const data = response.data.products;
        productos.value = data;
      
      })
      .catch((error) => {
        console.log(error);
      });
      productos.value = productos.value.map((prod) => {
        const order_amount =
          parseInt(localStorage.getItem(`order_amount_${prod.id}`)) || 1;
        return {
          idModal: `#p${prod.id}`,
          idUser: `p${prod.id}`,
          order_amount: order_amount,
          ...prod,
        };
      });
    console.log(productos.value);
  };

  const searchProduct = async () => {
    await listProd();
    if (!search.value.length) {
      Swal.fire("Ingrese un valor");
      listProd();
    }

    const data = productos.value.filter((product) =>
      product.name.toLowerCase().includes(search.value.toLowerCase())
    );

    productos.value = data;
    console.log(productos.value);
  };


  const filterCategory = async (type:any) => {
    await listProd();
    const data = productos.value.filter(product => product.type.id === type);


   productos.value = data;

}
 

  return {
    listProd,
    hd,
    hb,
    other,
    productos,
    search,
    searchProduct,
    filterCategory
  };
});
