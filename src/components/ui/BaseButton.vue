<template>
  <button>
    <div class="label">
      <slot></slot>
    </div>
  </button>
</template>

<script setup></script>

<style scoped>
/* .label {

} */

button {
  margin: 0 0px;
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  /* align-items: center; */
  /* vertical-align: bottom; */
  /* text-align: center; */
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
button:not(:disabled):hover {
  background: #089939;
  color: #020617;
  border-color: #089939;
}
button:not(:disabled):active {
  background: #a7f3d0;
  color: #020617;
  border-color: #a7f3d0;
}
button:disabled {
  background: #02270e;
  border-color: #034118;
  color: #020617;
}
</style>
