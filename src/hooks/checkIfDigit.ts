//// comnposable for checking if string consists only of digits ////
export default function useCheckIfDigit() {
  // prevents keystroke event if not a digit, otherwise just returns true
  function checkIfDigit(event: KeyboardEvent) {
    if (
      event.key.length === 1 &&
      (isNaN(Number(event.key)) || event.key === " ")
    ) {
      event.preventDefault();
    }
    return true;
  }
  return checkIfDigit;
}
