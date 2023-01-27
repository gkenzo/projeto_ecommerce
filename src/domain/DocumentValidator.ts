import { DocumentType, IDocumentValidator } from "./types";

class DocumentValidator implements IDocumentValidator {
  private static INSTANCE: DocumentValidator;

  private CPF_MAX_LENGTH = 11;
  private CNPJ_MAX_LENGTH = 14;
  private RESERVED_DOCUMENT: string[] = [];

  private constructor() {
    const reservedDocument = [];
    for (let i = 0; i < 10; i++) {
      reservedDocument.push(String(i).repeat(this.CPF_MAX_LENGTH));
      reservedDocument.push(String(i).repeat(this.CNPJ_MAX_LENGTH));
    }
    this.RESERVED_DOCUMENT = reservedDocument;
  }
  static getInstance = (): DocumentValidator => {
    if (!DocumentValidator.INSTANCE)
      DocumentValidator.INSTANCE = new DocumentValidator();
    return DocumentValidator.INSTANCE;
  };
  private removeMask = (document: string) => document.replace(/\D+/g, "");
  private validateCPF = (document: string): boolean => {
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
  private validateCNPJ = (document: string) => false;
  validate = (documentType: DocumentType, document: string) => {
    document = this.removeMask(document);
    if (this.RESERVED_DOCUMENT.includes(document)) return false;
    if (documentType === "CNPJ") {
      return document.length !== 14 ? false : this.validateCNPJ(document);
    }
    return document.length !== 11 ? false : this.validateCPF(document);
  };
}

export { DocumentValidator };
