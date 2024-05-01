<template>
  <teleport to="body">
    <div v-if="props.show" @click="emit('close')" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <section>
          <slot></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({ show: { type: Boolean, required: true } });
const emit = defineEmits(["close"]);


</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 10;
}


dialog {
  position: fixed;
  top: 40vh;
  left: calc(50% - 10rem);
  width: 20rem;
  /* left: 50%; */
  /* width: 30vw; */
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #18181b;
  color: white
}

section {
  padding: 1rem;
}

.dialog-enter-from,
.dialog-leave.to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.dialog-enter-active {
  transition: all 0.1s ease-out;
}

.dialog-leave-active {
  transition: all 0.01s ease-in;
}

/* @media (min-width: 768px) {
  dialog {
    left: calc(50% - 10rem);
    width: 20rem;
  }
} */


</style>
