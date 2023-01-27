import { DocumentType } from "./Account.interface";

interface IDocumentValidator {
  validate: (documentType: DocumentType, document: string | number) => boolean;
  removeMask: (document: string) => number;
  validateCPF: (document: number) => boolean;
  validateCNPJ: (document: number) => boolean;
}

export { IDocumentValidator };
