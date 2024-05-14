import { describe, test, expect, vi } from "vitest";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import useUpdateQuery from "../../hooks/updateQuery";

//// setting up mock route with query params ////
vi.mock("vue-router");
vi.mocked(useRouter).mockReturnValue({
  replace: vi.fn(),
});
vi.mocked(useRoute).mockReturnValue({
  query: { page: "5", id: "3" },
});

describe("Testing updateQuery function", () => {
  test("Only PAGE update", () => {
    const updateQueryA = useUpdateQuery();
    updateQueryA("2");

    expect(useRouter().replace).toHaveBeenCalledWith({ query: { page: "2" } });
  });

  test("Only ID update", () => {
    const updateQueryB = useUpdateQuery();
    updateQueryB(undefined, "7");

    expect(useRouter().replace).toHaveBeenCalledWith({
      query: { page: "5", id: "7" },
    });
  });

  test("Updating both PAGE and ID", () => {
    const updateQueryC = useUpdateQuery();
    updateQueryC("15", "23");

    expect(useRouter().replace).toHaveBeenCalledWith({
      query: { page: "15", id: "23" },
    });
  });

  test("Nothing to update", () => {
    const updateQueryD = useUpdateQuery();
    updateQueryD(undefined, undefined);

    expect(useRouter().replace).toHaveBeenCalledWith({
      query: { page:"5"},
    });
  });

});

