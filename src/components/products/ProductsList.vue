<!-- Main card with the products list -->
<template>
  <base-card>
    <!-- if not loading, showing the products list -->
    <template v-if="!isLoading" v-slot:title>List of products:</template>
    <template v-slot:content>
      <div v-if="!isLoading">
        <base-table
          :contents="products"
          colors="true"
          @clickOnRow="toggleDetails"
        ></base-table>
      </div>
      <!-- showing loading spinner during API requests -->
      <div v-if="isLoading" class="loadingSpinner">
        <progress-spinner strokeWidth="5"></progress-spinner>
      </div>
    </template>
    <!-- pagnation nav buttons -->
    <template v-slot:footer>
      <div v-if="!isLoading">
        <pagination></pagination>
      </div>
    </template>
  </base-card>
  <!-- this section contains modal with product details that is showed at clik on a row -->
  <base-modal :show="showModal" @close="toggleDetails">
    <div class="modal">
      <h3 class="modalTitle">Product Details</h3>
      <div class="details">
        <p>ID: {{ showProduct.id }}</p>
        <p>Name: {{ showProduct.name }}</p>
        <p>Year: {{ showProduct.year }}</p>
        <p>Color: {{ showProduct.color }}</p>
        <p>Pantone Value: {{ showProduct.pantone_value }}</p>
      </div>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
//// imports, local components and setting up the store ////
import Pagination from "./Pagination.vue";
import { useStore } from "../../store/store.ts";
import { ref, reactive, defineComponent, computed } from "vue";
import ProgressSpinner from "primevue/progressspinner";
defineComponent(["Pagination", "ProgressSpinner"]);
const store = useStore();

//// checking if the products are being loaded from the API ////
const isLoading = computed(() => store.getLoadingState);

//// checking for the current products list form the store ////
const products = computed(() => {
  if (!!store.getProducts) {
    return store.getProducts;
  } else {
    return [];
  }
});

//// flag for showing Product Details modal and details object ////
const showModal = ref(false);
const showProduct = reactive({
  id: "",
  name: "",
  year: "",
  color: "",
  pantone_value: "",
});

//// function for showing Product Details modal on row click/ ////
function toggleDetails(id?: String | Number) {
  if (!!id) {
    showModal.value = true;
    Object.assign(
      showProduct,
      products.value.find((el: any) => el.id === id)
    );
  } else {
    showModal.value = false;
  }
}
</script>

<style scoped>
.loadingSpinner {
  height: 50vh;
  display: flex;
  align-items: center;
}

.details p {
  margin: 0.2em;
}

.modalTitle {
  text-align: center;
  margin-top: 0em;
  margin-bottom: 0.1em;
}
</style>
