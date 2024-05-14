<!-- Pagination buttons component -->
<template>
  <div class="pagination">
    <div class="buttons">
      <base-button :disabled="disablePrev" @click="changePage('prev')">
        <i class="pi pi-arrow-left"></i>
      </base-button>
      <p class="pageNumber">
        <strong>Page {{ currentPage }}</strong>
      </p>
      <base-button :disabled="disableNext" @click="changePage('next')">
        <i class="pi pi-arrow-right"></i>
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../../store/store";
import { computed } from "vue";
import useUpdateQuery from "../../hooks/updateQuery.ts";

const store = useStore();
const updateQuery = useUpdateQuery();

// keeping trace of current page and total number of them
const currentPage = computed(() => store.getCurrentPage);
const numberOfPages = computed(() => store.getNumberOfPages);

// if last page, disable "next" button, if first, disable "prev"
const disablePrev = computed(() => (currentPage.value === 1 ? true : false));
const disableNext = computed(() =>
  currentPage.value === numberOfPages.value ? true : false
);

// changing page function
function changePage(direction: string) {
  let newPage = 0;
  if (direction === "next") {
    newPage = currentPage.value + 1;
  } else if (direction === "prev") {
    newPage = currentPage.value - 1;
  }
  // updating query params in URL and sending request for a new page
  updateQuery(newPage);
  store.changePage(newPage);
}
</script>

<style scoped>
.buttons {
  display: inline-flex;
  justify-content: center;
}

.pagination {
  margin-top: 5px;
  margin-bottom: 5px;
}

.pageNumber {
  padding: 0;
  margin: auto;
  text-align: center;
}
</style>
