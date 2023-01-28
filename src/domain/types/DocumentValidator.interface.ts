import { DocumentType } from ".";

interface IDocumentValidator {
  validate: ({
    documentType,
    document,
  }: {
    documentType: DocumentType;
    document: string;
  }) => boolean;
}

export { IDocumentValidator };
