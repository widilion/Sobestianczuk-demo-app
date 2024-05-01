import { setActivePinia, createPinia } from "pinia";
import { useStore } from "../../store/store.ts";
import { describe, test } from "vitest";
import axios from "axios";

vi.mock("axios");


describe("Nie ma takiego id", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });
    const responseMock = {
      status: 404,
      data: {
      },
    };
  axios.get.mockResolvedValue(responseMock)

  test("Zle ID w search"), async()=>{
    const store = useStore();
    await store.updateProducts(undefined, 13)

    expect(store.errorStatus).toBe(false)
    expect(store.getCurrentPage).toBe(1)
    expect(store.getNumberOfPages).toBe(1)
    expect(store.getProducts.length).toBe(0)
  }
});