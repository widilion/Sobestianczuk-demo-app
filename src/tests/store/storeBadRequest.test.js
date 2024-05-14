import { setActivePinia, createPinia } from "pinia";
import { useStore } from "../../store/store.ts";
import { describe, test } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("Processing request errors other than 404", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // mocking bad response
  const badResponseMock = {
    status: 505,
    message: "Error 505",
  };

  axios.get.mockResolvedValue(badResponseMock);

  test("request z bledem"),
    async () => {
      const store = useStore();
      await store.updateProducts(4, 6);

      expect(store.errorStatus).toBe(true);
      expect(store.errorInfo.code).toBe(505);
      expect(store.errorInfo.msg).toBe("Error 505");
    };
});
