import { describe, test, expect, vi } from "vitest";
import { useRoute } from "vue-router";
import useCheckForQuery from "../../hooks/checkForQuery";

vi.mock("vue-router");

describe("Sprawdzam odczytywanie queries z URL", () => {
  test("Oba parametry są podane", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { page: "5", id: "3" },
    });
    const checkForQueryA = useCheckForQuery();
    const queryA = checkForQueryA();
    expect(queryA).toStrictEqual(["5", "3"]);
  });

  test("Tylko page jest podane", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { page: "10" },
    });
    const checkForQueryB = useCheckForQuery();
    const queryB = checkForQueryB();
    expect(queryB).toStrictEqual(["10", ""]);
  });

  test("Tylko id jest podane", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { id: "13" },
    });
    const checkForQueryC = useCheckForQuery();
    const queryC = checkForQueryC();
    expect(queryC).toStrictEqual(["", "13"]);
  });

  test("Nie ma query", () => {
    vi.mocked(useRoute).mockReturnValue({
      query: {},
    });
    const checkForQueryD = useCheckForQuery();
    const queryD = checkForQueryD();
    expect(queryD).toStrictEqual(["", ""]);
  });
});
