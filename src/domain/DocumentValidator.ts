import { DocumentType, IDocumentValidator } from "./types";

class DocumentValidator implements IDocumentValidator {
  private static INSTANCE: DocumentValidator;

  CPF_MAX_LENGTH = 11;
  CNPJ_MAX_LENGTH = 14;
  RESERVED_DOCUMENT: string[] = [];

  private constructor() {
    const reservedDocument = [];
    for (let i = 0; i < 10; i++) {
      reservedDocument.push(String(i).repeat(this.CPF_MAX_LENGTH));
      reservedDocument.push(String(i).repeat(this.CNPJ_MAX_LENGTH));
    }
    this.RESERVED_DOCUMENT = reservedDocument;
  }
  static getInstance = (): DocumentValidator => {
    if (!DocumentValidator.INSTANCE) {
      DocumentValidator.INSTANCE = new DocumentValidator();
    }
    return DocumentValidator.INSTANCE;
  };
  removeMask = (document: string): number =>
    Number(document.replace(/\D+/g, ""));
  validateCPF = (document: number) => true;
  validateCNPJ = (document: number) => false;
  validate = (documentType: DocumentType, document: string | number) => {
    document =
      typeof document === "string" ? this.removeMask(document) : document;
    if (this.RESERVED_DOCUMENT.includes(String(document))) return false;

    if (documentType === "CNPJ") return this.validateCNPJ(document);
    return this.validateCPF(document);
  };
}

export { DocumentValidator };
