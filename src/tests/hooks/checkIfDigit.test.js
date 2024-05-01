import { describe, expect } from "vitest";
import useCheckIfDigit from "../../hooks/checkIfDigit";

const checkIfDigit = useCheckIfDigit();

describe("checkIfDigit test", () => {
  test("Letter was pressed", () => {
    const eventA = {
      key: "A",
      preventDefault() {
        return "prevented";
      },
    };

    const result = checkIfDigit(eventA);
    expect(eventA.preventDefault).toBeCalled;
  });

  test("Space was pressed", () => {
    const eventB = {
      key: " ",
      preventDefault() {
        return "prevented";
      },
    };

    const result = checkIfDigit(eventB);
    expect(eventB.preventDefault).toBeCalled;
  });

  test("Other sign was pressed", () => {
    const eventC = {
      key: "%",
      preventDefault() {
        return "prevented";
      },
    };

    const result = checkIfDigit(eventC);
    expect(eventC.preventDefault).toBeCalled;
  });

  test("Digit was pressed", () => {
    const eventD = {
      key: "4",
      preventDefault() {
        return "prevented";
      },
    };

    const result = checkIfDigit(eventD);
    expect(result).toBe(true);
  });
});
