interface IDocumentValidator {
  DOCUMENT_LENGTH: number;
  RESERVED_DOCUMENT: string[];
  document: string;
  validate: (document: string) => boolean;
}

export { IDocumentValidator };
