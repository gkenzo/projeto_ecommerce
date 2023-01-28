import { CNPJValidator } from "./CNPJValidator";
import { CPFValidator } from "./CPFValidator";
import { DocumentType, IDocumentValidator } from "./types";

class DocumentValidator implements IDocumentValidator {
  protected static INSTANCE: DocumentValidator;
  protected RESERVED_DOCUMENT: string[] = [];
  private constructor() {}
  static getInstance = () => {
    return DocumentValidator.INSTANCE
      ? DocumentValidator.INSTANCE
      : new DocumentValidator();
  };
  protected removeMask = (document: string) => document.replace(/\D+/g, "");
  validate = ({
    documentType,
    document,
  }: {
    documentType: DocumentType;
    document: string;
  }) => {
    document = this.removeMask(document);
    if (documentType === "CNPJ") {
      const cnpj = CNPJValidator.getInstance();
      return cnpj.validate({ document });
    }
    const cpf = CPFValidator.getInstance();
    return cpf.validate({ document });
  };
}

export { DocumentValidator };
