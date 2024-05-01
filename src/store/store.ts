import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("main", {
  state() {
    return {
      searchId: "",
      currentPage: 1,
      numberOfPages: 1,
      lastSeenPage: 1,
      products: [{}],
      errorStatus: false,
      errorInfo: {},
      isLoading: false
    };
  },
  getters: {
    getSearchId(state) {
      return state.searchId;
    },
    getProducts(state) {
      return state.products;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getNumberOfPages(state){
      return state.numberOfPages
    },
    getErrorInfo(state) {
      return state.errorInfo;
    },
    getErrorStatus(state) {
      return state.errorStatus;
    },
    getLastSeenPage(state) {
      return state.lastSeenPage;
    },
    getLoadingState(state){
      return state.isLoading;
    }
  },
  actions: {
    //// czyszczenie stanu wyszukiwania po błedzie z serwera ////
    async clearError() {
      this.errorStatus = false;
      this.errorInfo = {};
      this.searchId = "";
      await this.updateProducts(this.lastSeenPage);
    },

    //// wyszukiwanie produktu po id na serwerze ////
    async setSearchId(id: any) {
      this.searchId = id;
      if (id || id === "") {
        await this.updateProducts(this.lastSeenPage, this.searchId);
      }
    },

    //// zmiana strony na next lub previous
    async changePage(newPage: number) {
      await this.updateProducts(newPage);
    },

    //// zapamietywanie ostatnio ogladanej strony ////
    setLastPage() {
      this.lastSeenPage = this.currentPage;
    },

    //// funkcja ktora wylacza dzialanie paginacji
    blockPagination() {
      this.currentPage = 1;
      this.numberOfPages = 1;
    },

    //// wysylanie zapytania do serwera o produkty na stronie albo o danym id ////
    async updateProducts(page?: number | string, id?: string | number) {
      // rozpoczynam wyswietlenie loadingu
      this.isLoading = true;
      // tworze zmienne na odpowiedz serwera i na fragmenty URL
      let response;
      let linkPage = "";
      let linkId = "";
      // zeruje bledy z poprzednich zapytań jeśli jakieś były
      this.errorStatus = false;
      this.errorInfo = {};

      if (!!page) {
        // sprawdzam czy pytam o strone
        linkPage = `&page=${page}`; // jesli tak dodaje strone do query param
      } else {
        linkPage = `&page=${this.currentPage}`; // jesli nie, zostawaiam w adresie aktualna strone
      }
      if (!!id) {
        //sprawdzam czy pytam o id
        linkId = `&id=${id}`; // jesli tak to dodaje id do query param
      }
      // tworze URL do zapytania API
      const url =
        "https://reqres.in/api/products/?per_page=5" + linkPage + linkId;

      // wysylam zapytanie
      try {
        response = await axios.get(url);
      } catch (error: any) {
        // w przypadku bledu tworze sobie obiekt z kodem i wiadomoscią
        const err = {
          code: error.response.status,
          msg: error.message,
        };

        if (err.code === 404) {
          // blad 404 oznacza ze nie bylo takiego id produktu
          this.blockPagination(); // wylaczam paginacje
          this.products = []; // nie ma produktow
        } else {
          // inny kod bledu odpala modal z informacja o bledzie
          this.errorStatus = true;
          this.errorInfo = err;
        }
        this.isLoading = false;
        return;
      }
      // jesli odpowiedz wrocila i nie ma zadnego bledu
      if (response.status === 200) {
        if (!!id) {
          // znalazlem tylko jeden produkt
          this.blockPagination(); // wylaczam paginacje
          this.products = [response.data.data]; // odpowiedz to obiekt z jednym produktem ale BaseTable oczekuje array of objects
        } else {
          // zmienilem na inna strone
          this.currentPage = response.data.page;
          this.numberOfPages = response.data.total_pages;
          this.products = response.data.data;
          this.setLastPage();  // ustawiam obecną strone jako ostatnio ogladana
        }
      }
      // kończę loading
      this.isLoading = false;
      return;
    },
  },
});
