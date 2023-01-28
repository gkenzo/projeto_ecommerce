import { IDocumentValidator } from "./types";

class CPFValidator implements IDocumentValidator {
  static INSTANCE: CPFValidator;
  DOCUMENT_LENGTH = 11;
  RESERVED_DOCUMENT: string[] = [];

  private constructor() {
    for (let i = 0; i < 10; i++)
      this.RESERVED_DOCUMENT.push(String(i).repeat(this.DOCUMENT_LENGTH));
  }
  static getInstance = () => {
    return CPFValidator.INSTANCE ? CPFValidator.INSTANCE : new CPFValidator();
  };
  validate = ({ document }: { document: string }): boolean => {
    if (
      document.length !== this.DOCUMENT_LENGTH ||
      this.RESERVED_DOCUMENT.includes(document)
    )
      return false;
    let sum = 0;
    let remnant = 0;
    const validationDigitPositions = [10, 11];
    const sumNumbersUpToPosition = (position: 9 | 10) => {
      let sum = 0;
      for (let i = 1; i <= position; i++) {
        const lastDigitToBeSummed = position + 2 - i;
        sum += parseInt(document.substring(i - 1, i)) * lastDigitToBeSummed;
      }
      return sum;
    };
    const getRemnant = (total: number) => (total * 10) % 11;
    sum = sumNumbersUpToPosition(9);
    remnant = validationDigitPositions.includes(getRemnant(sum))
      ? 0
      : getRemnant(sum);
    if (remnant != parseInt(document.substring(9, 10))) return false;
    sum = sumNumbersUpToPosition(10);
    remnant = validationDigitPositions.includes(getRemnant(sum))
      ? 0
      : getRemnant(sum);
    if (remnant != parseInt(document.substring(10, 11))) return false;
    return true;
  };
}

export { CPFValidator };
