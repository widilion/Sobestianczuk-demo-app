<!-- The App header component
Contains: 
- logo (clickable, takes back to the 1st page)
- name of the App
- search field
-->

<template>
  <header id="theHeader">
    <!-- left part of the header -->
    <div class="alignLeft">
      <div class="imageWrapper">
        <!-- needed to maintain size and ratio of the logo -->
        <img
          class="appLogo"
          src="../../assets/bazant-transparent-512px.png"
          alt="Bażant"
          @click="resetPage"
        />
      </div>
      <h1 class="appTitle">P. Sobestiańczuk</h1>
    </div>
    <!-- right part of the header -->
    <div class="alignRight">
      <div class="searchBar">
        <label class="searchLabel" for="search">
          <i id="searchIcon" class="pi pi-search"></i>
          Filter products' ID:
        </label>
        <!-- search field -->
        <search-input></search-input>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "../../store/store";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

// function for reseting to the 1st page
function resetPage() {
  store.changePage(1);
  router.push("/");
}
</script>

<style scoped>
#theHeader {
  display: inline-flex;
  width: 100%;
  height: auto;
  background-color: #18181b;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-shrink: 0;
}

#searchIcon {
  margin-right: 0.5em;
}

.appTitle {
  color: antiquewhite;
  padding: 0.1em 0 0 0;
  font-size: 16px;
  font-size: 2.5vw;
}

.appLogo {
  display: block;
  width: 100%;
  max-width: 512px; /*actual image width*/
  height: auto; /* maintain aspect ratio*/
  margin: auto; /*optional centering of image*/
  cursor: pointer;
}

.imageWrapper {
  width: 100px;
  margin: 0.5em 0.5em 0em 2em;
}

.alignLeft {
  display: inline-flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.alignRight {
  width: 50%;
  align-items: center;
}

.searchLabel {
  color: antiquewhite;
  padding: 0 0.5em 0 0.5em;
}

.searchBar {
  float: right;
  margin: 0 3vw 0 0;
}

.searchField {
  width: 10em;
}
</style>
