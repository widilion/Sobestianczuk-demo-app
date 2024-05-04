<template>
  <card>
    <template v-if="!isLoading" v-slot:title>List of products:</template>
    <template v-slot:content>
      <div v-if="!isLoading">
      <base-table
        :contents="products"
        colors="true"
        @clickOnRow="toggleDetails"
      ></base-table>
      <pagination></pagination>
    </div>
    <div v-if="isLoading" class="loadingSpinner">
  <progress-spinner strokeWidth="5"></progress-spinner>
    </div>
    </template>
  </card>
  <base-modal :show="showModal" @close="toggleDetails">
    <div class="modal">
      <h3>Product Details</h3>
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
import Pagination from "./Pagination.vue";
import { useStore } from "../../store/store.ts";
import { ref, reactive, defineComponent, computed } from "vue";
import ProgressSpinner from "primevue/progressspinner";
defineComponent(["Pagination","ProgressSpinner"]);
const store = useStore();

const products = computed(() => {
  if (!!store.getProducts) {
    return store.getProducts;
  } else {
    return [];
  }
});

const isLoading = computed(()=> store.getLoadingState)

const showModal = ref(false);
const showProduct = reactive({
  id: "",
  name: "",
  year: "",
  color: "",
  pantone_value: "",
});

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
card {
  max-width: 100vw;
}

.loadingSpinner{
  width: 20vw;
  height: 50vh;
  display: flex;
  align-items: center;
}

.details p {
  margin: 0.2em;
}

h3 {
  text-align: center;
  margin-top: 0em;
  margin-bottom: 0.1em;
}
</style>
