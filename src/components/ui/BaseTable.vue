<!-- Base table component -->
<template>
  <!-- message if there are no contents -->
  <p v-if="noData">No items found.</p>
  <!-- the table -->
  <table v-else class="baseTable">
    <tr>
      <th>{{ columnHeads[0] }}</th>
      <th>{{ columnHeads[1] }}</th>
      <th>{{ columnHeads[2] }}</th>
    </tr>
    <!-- version with colored backgrounds (if there is "colors" prop)-->
    <!-- clicking on row emits event with this row ID -->
    <tr
      v-if="props.colors"
      v-for="obj in props.contents"
      :bgcolor="obj.color"
      @click="rowClick(obj.id)"
    >
      <td>{{ obj.id }}</td>
      <td>{{ obj.name }}</td>
      <td>{{ obj.year }}</td>
    </tr>
    <!-- version without colored backgrounds as a fallback -->
    <tr v-else v-for="obj in props.contents">
      <td v-for="value in Object.values(obj)">{{ value }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

// defining type of contents as an array of objects
type TableData = {
  id: String;
  name: String;
  year: String;
  color: String;
  pantone_value: String;
}[];

// defining props
const props = defineProps({
  contents: {
    type: Array as PropType<TableData>,
    default: null,
    required: false,
  },
  colors: { type: String, required: false },
});

// check if any contents passed as a props from parent component, if no then noData is true
const noData = computed(() => {
  if (props.contents.length > 0) {
    return false;
  } else {
    return true;
  }
});

// taking columns' names from keys in one of content objects, replacing any "_" with spaces
const columnHeads = computed(() => {
  let keys: String[] =
    props.contents === undefined ? [""] : Object.keys(props.contents[0]);
  keys.forEach((element, ind, array) => {
    array[ind] = element.toUpperCase();
    array[ind] = array[ind].replace("_", " ");
  });
  return keys;
});

// defining emits
const emit = defineEmits(["clickOnRow"]);

// function for emiting row ID on click
function rowClick(rowId: String | Number) {
  emit("clickOnRow", rowId);
}
</script>

<style scoped>
@media all and (min-width: 1080px) {
  .baseTable {
    font-size: 1.3em;
  }
}
@media (max-width: 1079px) {
  .baseTable {
    font-size: 1.2em;
  }
}

.baseTable {
  font-family: inherit;
  border-collapse: collapse;
  width: 100%;
  max-width: 100vw;
}

.baseTable td,
.baseTable th {
  border-bottom: 1px solid #424242;
  padding: 8px;
  text-align: center;
}

.baseTable th {
  padding-top: 0px;
  padding-bottom: 5px;
  text-align: center;
  background-color: #18181b;
  color: white;
}
</style>
