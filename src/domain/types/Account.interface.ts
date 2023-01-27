import { IAddress } from ".";
import { IDocumentValidator } from "./DocumentValidator.interface";

type createAccountInputDTO = Pick<IAccount, "name" | "document" | "type">;

type DocumentType = "CPF" | "CNPJ";

interface isValidDocumentInputDTO {
  type: DocumentType;
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
    type,
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
