import { IDocumentValidator } from "./types";

class CNPJValidator implements IDocumentValidator {
  static INSTANCE: CNPJValidator;
  DOCUMENT_LENGTH = 14;
  protected RESERVED_DOCUMENT: string[] = [];
  private constructor() {
    for (let i = 0; i < 10; i++)
      this.RESERVED_DOCUMENT.push(String(i).repeat(this.DOCUMENT_LENGTH));
  }
  static getInstance = () => {
    return CNPJValidator.INSTANCE
      ? CNPJValidator.INSTANCE
      : new CNPJValidator();
  };

  validate = ({ document }: { document: string }) => false;
}

export { CNPJValidator };
