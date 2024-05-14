<!-- Base card component -->
<template>
  <div class="card">
    <div class="cardTitle">
      <slot name="title"></slot>
    </div>
    <div class="cardContent">
      <slot name="content"></slot>
    </div>
    <div class="cardFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #18181b;
  color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 12px;
  /* card size */
  width: 28vw;
  height: 45vh;
  min-height: 395px;
  min-width: 255px;
}
.card .cardTitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5em;
  margin-bottom: 0;
}

.card .cardContent {
  padding: 0 0 0 0;
}
.card .cardFooter {
  margin-top: auto;
  margin-bottom: 0px;
  padding: 0 0 0 0;
}
</style>
