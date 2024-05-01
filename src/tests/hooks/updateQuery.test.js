import { describe, test, expect, vi } from "vitest";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import useUpdateQuery from "../../hooks/updateQuery";

vi.mock("vue-router");
vi.mocked(useRouter).mockReturnValue({
  replace: vi.fn(),
});
vi.mocked(useRoute).mockReturnValue({
  query: { page: "5", id: "3" },
});

describe("Sprawdzam update query z wewnątrz aplikacji", () => {
  test("Apka updatuje tylko page", () => {
    const updateQueryA = useUpdateQuery();
    updateQueryA("2");

    expect(useRouter().replace).toHaveBeenCalledWith({ query: { page: "2" } });
  });

  test("Apka updatuje tylko id", () => {
    const updateQueryB = useUpdateQuery();
    updateQueryB(undefined, "7");

    expect(useRouter().replace).toHaveBeenCalledWith({
      query: { page: "5", id: "7" },
    });
  });

  test("Apka updatuje page i id", () => {
    const updateQueryC = useUpdateQuery();
    updateQueryC("15", "23");

    expect(useRouter().replace).toHaveBeenCalledWith({
      query: { page: "15", id: "23" },
    });
  });

  test("Apka nie updatuje nic", () => {
    const updateQueryD = useUpdateQuery();
    updateQueryD(undefined, undefined);

    expect(useRouter().replace).toHaveBeenCalledWith({
      query: { page:"5"},
    });
  });

});

