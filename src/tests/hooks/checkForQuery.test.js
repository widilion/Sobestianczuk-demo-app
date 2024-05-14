import { describe, test, expect, vi } from "vitest";
import { useRoute } from "vue-router";
import useCheckForQuery from "../../hooks/checkForQuery";

vi.mock("vue-router");

describe("Checking reading query params from URL", () => {
  test("PAGE and ID are present in params", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { page: "5", id: "3" },
    });
    const checkForQueryA = useCheckForQuery();
    const queryA = checkForQueryA();
    expect(queryA).toStrictEqual(["5", "3"]);
  });

  test("Only PAGE is present", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { page: "10" },
    });
    const checkForQueryB = useCheckForQuery();
    const queryB = checkForQueryB();
    expect(queryB).toStrictEqual(["10", ""]);
  });

  test("Only ID is present", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { id: "13" },
    });
    const checkForQueryC = useCheckForQuery();
    const queryC = checkForQueryC();
    expect(queryC).toStrictEqual(["", "13"]);
  });

  test("No query params", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: {},
    });
    const checkForQueryD = useCheckForQuery();
    const queryD = checkForQueryD();
    expect(queryD).toStrictEqual(["", ""]);
  });
});
