<!-- Main App-->
<template>
  <the-header></the-header>
  <div class="pageContent">
    <router-view></router-view>
    <base-modal :show="isError" @close="clearError">
      <h3 class="errMsg">An error occured during request.</h3>
      <p class="errMsg"><strong>Error code: </strong>{{ errorInfo.code }}</p>
      <p class="errMsg"><strong>Error message: </strong>{{ errorInfo.msg }}</p>
    </base-modal>
  </div>
</template>

<script setup lang="ts">
//// imports ////
import { useStore } from "./store/store.ts";
import { useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import useCheckForQuery from "./hooks/checkForQuery.ts";
import TheHeader from "./components/layout/TheHeader.vue";

//// local components ////
defineComponent(["TheHeader"]);

//// setting up router and store ////
const router = useRouter();
const store = useStore();

//// local hooks ////
const checkForQuery = useCheckForQuery();

//// initial loading of products if there is a query in the url ////
router.isReady().then(() => {
  let query = checkForQuery();
  store.updateProducts(query[0], query[1]);
});

//// vars for checking if there is and storing any request error data ////
let isError = computed(() => store.getErrorStatus);
let errorInfo: any = computed(() => store.getErrorInfo);

//// disabling request error modal ////
function clearError() {
  store.clearError();
}
</script>

<style>
.pageContent {
  justify-items: center;
  margin-top: 6em;
  max-width: 100vw;
}

.errMsg {
  text-align: center;
}
</style>
