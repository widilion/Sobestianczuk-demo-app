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
import { useStore } from "./store/store.ts";
import { useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import useCheckForQuery from "./hooks/checkForQuery.ts";
import TheHeader from "./components/layout/TheHeader.vue";
const router = useRouter();

defineComponent(["TheHeader"]);
const store = useStore();
const checkForQuery = useCheckForQuery();

router.isReady().then(() => {
  let query = checkForQuery();
  store.updateProducts(query[0], query[1]);
});

let isError = computed(() => store.getErrorStatus);
let errorInfo: any = computed(() => store.getErrorInfo);

function clearError() {
  store.clearError();
}
</script>

<style>
@import "./assets/styles.css";

.pageContent {
  justify-items: center;
  margin-top: 6em;
  max-width: 100vw;
}

.errMsg {
  text-align: center;
}
</style>
