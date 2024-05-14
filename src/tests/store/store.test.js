import { setActivePinia, createPinia } from "pinia";
import { useStore } from "../../store/store.ts";
import { describe, test } from "vitest";
import axios from "axios";

vi.mock("axios");

//// seting up mock store ////
describe("Store test", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const responseMock = {
    status: 200,
    data: {
      page: 5,
      total_pages: 6,
      data: [
        {
          id: 6,
          name: "blue turquoise",
          year: 2005,
          color: "#53B0AE",
          pantone_value: "15-5217",
        },
        {
          id: 7,
          name: "sand dollar",
          year: 2006,
          color: "#DECDBE",
          pantone_value: "13-1106",
        },
      ],
    },
  };

  axios.get.mockResolvedValue(responseMock);

  test("setLastPage test", () => {
    const store = useStore();
    store.currentPage = 4;
    store.setLastPage();
    expect(store.getLastSeenPage).toBe(4);
  });

  test("blockPagination test", () => {
    const store = useStore();
    store.currentPage = 4;
    store.numberOfPages = 3;
    store.blockPagination();
    expect(store.getCurrentPage, store.getNumberOfPages).toBe(1, 1);
  });

  test("upadteProducts with PAGE and ID", async () => {
    const store = useStore();
    await store.updateProducts(4, 6);

    expect(axios.get).toHaveBeenCalledWith(
      "https://reqres.in/api/products/?per_page=5&page=4&id=6"
    );
    expect(store.getCurrentPage).toBe(1);
    expect(store.lastSeenPage).toBe(1);
    expect(store.numberOfPages).toBe(1);
    expect(store.products.length).toBe(1);
  });

  test("updateProducts only with PAGE", async () => {
    const store = useStore();
    await store.updateProducts(5);

    expect(store.getCurrentPage).toBe(5);
    expect(store.getNumberOfPages).toBe(6);
    expect(store.getProducts.length).toBe(2);
    expect(store.getLastSeenPage).toBe(5);
  });

  test("changePage test", async () => {
    const store = useStore();
    await store.changePage(4);
    expect(axios.get).toHaveBeenCalledWith(
      "https://reqres.in/api/products/?per_page=5&page=4"
    );
  });

  test("setSearchId with ID", async () => {
    const store = useStore();
    await store.setSearchId(4);
    expect(axios.get).toHaveBeenCalledWith(
      "https://reqres.in/api/products/?per_page=5&page=1&id=4"
    );
  });

  test("setSearchId without ID", async () => {
    const store = useStore();
    await store.setSearchId("");
    expect(axios.get).toHaveBeenCalledWith(
      "https://reqres.in/api/products/?per_page=5&page=1"
    );
  });

  test("clearError test", async () => {
    const store = useStore();
    store.errorStatus = true;
    store.errorInfo = { code: 404, msg: "bad request 404" };
    store.searchId = "4";
    store.lastSeenPage = 8;

    await store.clearError();

    expect(store.getErrorStatus).toBe(false);
    expect(store.getErrorInfo).toStrictEqual({});
    expect(store.getSearchId).toBe("");
    expect(axios.get).toHaveBeenCalledWith(
      "https://reqres.in/api/products/?per_page=5&page=8"
    );
  });
});
