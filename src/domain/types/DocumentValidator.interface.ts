import { DocumentType } from "./Account.interface";

interface IDocumentValidator {
  validate: (documentType: DocumentType, document: string) => boolean;
  removeMask: (document: string) => string;
  validateCPF: (document: string) => boolean;
  validateCNPJ: (document: string) => boolean;
}

export { IDocumentValidator };
