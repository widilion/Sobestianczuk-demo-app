<template>
  <header>
    <div class="alignLeft">
      <div class="imageWrapper">
        <img src="../../assets/bazant-transparent-512px.png" alt="Bażant" />
      </div>
      <h1>Zadanie Gumiaka</h1>
    </div>
    <div class="alignRight">
      <div class="searchBar">
        <label for="search"
          ><i class="pi pi-search"></i>Filter products' ID:</label
        >
        <search-input></search-input>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
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
i {
  margin-right: 0.5em;
}
h1 {
  color: antiquewhite;
  padding: 0.1em 0 0 0;
  font-size: 16px;
  font-size: 2.5vw;
}

img {
  display: block;
  width: 100%;
  max-width: 512px; /*actual image width*/
  height: auto; /* maintain aspect ratio*/
  margin: auto; /*optional centering of image*/
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

label {
  color: antiquewhite;
  padding: 0 0.5em 0 0.5em;
}

p {
  color: white;
  padding: 1rem;
}

.searchBar {
  float: right;
  margin: 0 3vw 0 0;
}

.searchField {
  width: 10em;
}
</style>
