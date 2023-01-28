import { IDocumentValidator } from "./types";
class CPFValidator implements IDocumentValidator {
  static INSTANCE: CPFValidator;
  DOCUMENT_LENGTH = 11;
  RESERVED_DOCUMENT: string[] = [];
  document = "";

  private constructor() {
    for (let i = 0; i < 10; i++)
      this.RESERVED_DOCUMENT.push(String(i).repeat(this.DOCUMENT_LENGTH));
  }
  static getInstance = () => {
    return CPFValidator.INSTANCE ? CPFValidator.INSTANCE : new CPFValidator();
  };

  sumNumbersUpToPosition = (position: 9 | 10) => {
    let sum = 0;
    for (let i = 1; i <= position; i++) {
      const lastDigitToBeSummed = position + 2 - i;
      sum += parseInt(this.document.substring(i - 1, i)) * lastDigitToBeSummed;
    }
    return sum;
  };

  validate = ({ document }: { document: string }): boolean => {
    if (
      document.length !== this.DOCUMENT_LENGTH ||
      this.RESERVED_DOCUMENT.includes(document)
    )
      return false;
    this.document = document;

    const validationDigitPositions = [10, 11];

    const lastPositionToBeChecked = [9, 10];

    const isValid: boolean[] = [];

    for (let run = 0; run < 2; run++) {
      let sum = 0;
      let remnant = 0;
      let validationDigitToBeChecked = [run + 9, run + 10];
      sum = this.sumNumbersUpToPosition(lastPositionToBeChecked[run] as 9 | 10);
      remnant = validationDigitPositions.includes((sum * 10) % 11)
        ? 0
        : (sum * 10) % 11;
      if (
        remnant !=
        parseInt(
          document.substring(
            validationDigitToBeChecked[0],
            validationDigitToBeChecked[1]
          )
        )
      ) {
        isValid.push(false);
        break;
      }
    }
    if (isValid.some((run) => run === false)) return false;
    return true;
  };
}

export { CPFValidator };
