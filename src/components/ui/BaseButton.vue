<!-- Base button component-->
<template>
  <button class="baseButton">
    <slot></slot>
  </button>
</template>

<script setup></script>

<style scoped>
.baseButton {
  margin: 0 0px;
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  margin: 0.2em 1em;
  overflow: hidden;
  position: relative;
  color: #020617;
  background: #078331;
  border: 1px solid #078832;
  padding: 0.5rem 1rem;
  font-size: 1em;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s, outline-color 0.2s;
  border-radius: 6px;
  outline-color: transparent;
}
.baseButton:not(:disabled):hover {
  background: #089939;
  color: #020617;
  border-color: #089939;
}
.baseButton:not(:disabled):active {
  background: #a7f3d0;
  color: #020617;
  border-color: #a7f3d0;
}
.baseButton:disabled {
  background: #02270e;
  border-color: #034118;
  color: #020617;
}
</style>
