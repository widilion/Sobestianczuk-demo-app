<template>
  <div id="staticTable">
    <p v-if="noData">No items found.</p>
    <table v-else id="table">
      <tr>
        <th>{{ columnHeads[0] }}</th>
        <th>{{ columnHeads[1] }}</th>
        <th>{{ columnHeads[2] }}</th>
      </tr>
      <tr
        v-if="props.colors"
        v-for="obj in props.contents"
        :bgcolor="obj.color"
        @click="rowClick(obj.id)"
      >
        <!-- wersja z kolorowymi tłami  -->
        <td>{{ obj.id }}</td>
        <td>{{ obj.name }}</td>
        <td>{{ obj.year }}</td>
      </tr>
      <tr v-else v-for="obj in props.contents">
        <!-- wersja zwyczajna -->
        <td v-for="value in Object.values(obj)">{{ value }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
type TableData = {
  //definiuje typ: array of objects
  id: String;
  name: String;
  year: String;
  color: String;
  pantone_value: String;
}[];

const props = defineProps({
  contents: {
    type: Array as PropType<TableData>,
    default: null,
    required: false,
  }, //definiuje potrzebny props jako array of objects
  colors: { type: String, required: false },
});

const noData = computed(() => {
  // Jeśli komponent nie otrzymał danych noData = true
  if (props.contents.length > 0) {
    return false;
  } else {
    return true;
  }
});

const columnHeads = computed(() => {
  let keys: String[] =
    props.contents === undefined ? [""] : Object.keys(props.contents[0]);
  keys.forEach((element, ind, array) => {
    array[ind] = element.toUpperCase();
    array[ind] = array[ind].replace("_", " ");
  });
  return keys;
});

const emit = defineEmits(["clickOnRow"]);

function rowClick(rowId: String | Number) {
  emit("clickOnRow", rowId);
}
</script>

<style scoped>
@media all and (min-width: 1080px) {
  #table {
    font-size: 1.5vw;
  }
  #staticTable {
    width: 20vw;
    height: 45vh;
  }
}

@media (max-width: 1079px) {
  #table {
    font-size: 5vw;
  }
  #staticTable {
  width: 65vw;
  height: 37vh;
}
}


#table {
  font-family: inherit;
  border-collapse: collapse;
  width: 100%;
  max-width: 100vw;
}

#table td,
#table th {
  border-bottom: 1px solid #424242;
  padding: 8px;
  text-align: center;
}

#table th {
  padding-top: 0px;
  padding-bottom: 5px;
  text-align: center;
  background-color: #18181b;
  color: white;
}
</style>
