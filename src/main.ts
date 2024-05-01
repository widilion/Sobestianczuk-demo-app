import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import router from "./router.ts";

import primeVue from "primevue/config"; //importuje PrimeVue do stylizacji
import Card from "primevue/card";
import BaseTable from "./components/ui/BaseTable.vue";
import BaseModal from "./components/ui/BaseModal.vue";
import InputText from "primevue/inputtext";
import SearchInput from "./components/products/SearchInput.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import "./style.css"; // domyslne style
import "primeicons/primeicons.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(primeVue);
app.use(router)

app.component("card", Card);
app.component("input-text", InputText);
app.component("base-table", BaseTable);
app.component("base-modal", BaseModal);
app.component("search-input", SearchInput);
app.component("base-button", BaseButton);

app.mount("#app");
