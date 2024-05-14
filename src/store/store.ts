/* Main Pinia store configuration */

import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("main", {
  //////////////////////////
  //// state of the app ////
  //////////////////////////
  state() {
    return {
      searchId: "", // ID of searched product
      currentPage: 1, // current shown page
      numberOfPages: 1, // total number of products pages
      lastSeenPage: 1, // page last seen before search
      products: [{}], // array of all products requested from API
      errorStatus: false, // status of request - true if request failed and error occured
      errorInfo: {}, // object to which error code and message are saved in case of request error
      isLoading: false, // flag of ongoing request, needed to show loading spinner
    };
  },
  ////////////////////////////
  //// respectful getters ////
  ////////////////////////////
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
    getNumberOfPages(state) {
      return state.numberOfPages;
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
    getLoadingState(state) {
      return state.isLoading;
    },
  },
  ///////////////////////
  //// store actions ////
  ///////////////////////
  actions: {
    //// searching product on the API by product ID ////
    async setSearchId(id: any) {
      this.searchId = id;
      if (id || id === "") {
        await this.updateProducts(this.lastSeenPage, this.searchId);
      }
    },

    //// changing shown page to next or previous ////
    async changePage(newPage: number) {
      await this.updateProducts(newPage);
    },

    //// storing last seen page to revert after bad request or search ////
    setLastPage() {
      this.lastSeenPage = this.currentPage;
    },

    //// blocking pagination component after search by ID ////
    blockPagination() {
      this.currentPage = 1;
      this.numberOfPages = 1;
    },

    //// clearing app state after dissmisng request error ////
    async clearError() {
      this.errorStatus = false;
      this.errorInfo = {};
      this.searchId = "";
      await this.updateProducts(this.lastSeenPage);
    },

    //// requesting products from API by page or ID////
    async updateProducts(page?: number | string, id?: string | number) {
      // setting loading state and showing loading spinner
      this.isLoading = true;
      // vars for request elements
      let response;
      let linkPage = "";
      let linkId = "";
      // clearing errors from past requests
      this.errorStatus = false;
      this.errorInfo = {};

      if (!!page) {
        // checking if there is a page request
        linkPage = `&page=${page}`; // if so, adding page to query params
      } else {
        linkPage = `&page=${this.currentPage}`; // if no leaving current page in the URL
      }
      if (!!id) {
        // checking if there is an ID request
        linkId = `&id=${id}`; // if so, adding it to query params
      }
      // constructing request URL
      const url =
        "https://reqres.in/api/products/?per_page=5" + linkPage + linkId;

      // sending request to API
      try {
        response = await axios.get(url);
      } catch (error: any) {
        // creating error object in case of bad response
        const err = {
          code: error.response.status,
          msg: error.message,
        };

        if (err.code === 404) {
          // 404 code - searched ID not in base
          this.blockPagination(); // turning off pagination controls
          this.products = [];
        } else {
          // error codes different than 404 - the error object is set
          this.errorStatus = true;
          this.errorInfo = err;
        }
        // end of loading
        this.isLoading = false;
        return;
      }
      // request turned out OK
      if (response.status === 200) {
        if (!!id) {
          // if ID was in the query - there should be only one product returned
          this.blockPagination(); // so the pagination controls are turned off
          this.products = [response.data.data]; // needed beacuse BaseTable.vue accepts only array of objects
        } else {
          // the request was for page change
          this.currentPage = response.data.page;
          this.numberOfPages = response.data.total_pages;
          this.products = response.data.data;
          this.setLastPage(); // saving current page as last seen
        }
      }
      // end of loading
      this.isLoading = false;
      return;
    },
  },
});
