import { IAddress } from ".";
import { IDocumentValidator } from "./DocumentValidator.interface";

type createAccountInputDTO = Pick<IAccount, "name" | "document" | "type">;

type DocumentType = "CPF" | "CNPJ";

interface isValidDocumentInputDTO {
  documentType: DocumentType;
  document: string;
  documentValidator: IDocumentValidator;
}

interface IAccount {
  id: string;
  name: string;
  type: DocumentType;
  document: string;
  address: IAddress;
  isValidDocument: ({
    documentType,
    document,
    documentValidator,
  }: isValidDocumentInputDTO) => boolean;
}

export {
  IAccount,
  createAccountInputDTO,
  DocumentType,
  isValidDocumentInputDTO,
};
