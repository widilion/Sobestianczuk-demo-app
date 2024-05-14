/* Main typescript file */
import { createApp } from "vue";
import App from "./App.vue";

//// importing Pinia ////
import { createPinia } from "pinia";
//// importing router configuration ////
import router from "./router.ts";
//// importing global components and styles ////
import primeVue from "primevue/config"; //importuje PrimeVue do stylizacji
import BaseTable from "./components/ui/BaseTable.vue";
import BaseModal from "./components/ui/BaseModal.vue";
import BaseCard from './components/ui/BaseCard.vue'
import SearchInput from "./components/products/SearchInput.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import "./styles.css"; // domyslne style
import "primeicons/primeicons.css";

//// creating Pinia and App
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(primeVue);
app.use(router)
//// registering global components ////
app.component("base-table", BaseTable);
app.component("base-card", BaseCard)
app.component("base-modal", BaseModal);
app.component("search-input", SearchInput);
app.component("base-button", BaseButton);

app.mount("#app");
