export default function useCheckIfDigit() {
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
