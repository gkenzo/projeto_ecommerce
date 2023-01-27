import { DocumentType } from ".";

interface IDocumentValidator {
  validate: (documentType: DocumentType, document: string) => boolean;
}

export { IDocumentValidator };
