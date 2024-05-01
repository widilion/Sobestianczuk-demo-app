<template>
<input size="15" type="text" v-model.trim="inputValue" @keydown="checkIfDigit"></input>
</template>

<script setup lang="ts">
import { debounce } from 'ts-debounce'
import { watch } from "vue";
import { useStore } from "../../store/store.ts";
import useUpdateQuery from '../../hooks/updateQuery.ts'
import useCheckIfDigit from '../../hooks/checkIfDigit'

const store = useStore();
const updateQuery = useUpdateQuery()
const checkIfDigit = useCheckIfDigit()

const inputValue = defineModel()
const setSearchDebounced = debounce(store.setSearchId,1000)
const updateQueryDebounced = debounce(updateQuery, 1000)


watch(inputValue,()=>{
    let searchId = "";
    if (typeof inputValue.value === "string"){
    searchId = inputValue.value };
    updateQueryDebounced(store.getLastSeenPage,searchId)
    setSearchDebounced(inputValue.value);
})

</script>

<style scoped>
input{
    font-family: var(--font-family);
    font-feature-settings: var(--font-feature-settings, normal);
    font-size: 0.875rem;
    color: #ffffff;
    background: #09090b;
    padding: 0.5rem 0.75rem;
    border: 1px solid #3f3f46;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
    appearance: none;
    border-radius: 6px;
    outline-color: transparent;
}

input:enabled:hover{
    border-color: #52525b;
}

input:enabled:focus {
    outline: 1px solid var(--p-focus-ring-color);
    outline-offset: -1px;
    box-shadow: none;
    border-color: #52525b;
  }
</style>