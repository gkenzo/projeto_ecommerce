import { IAddress } from ".";

type createAccountInputDTO = Pick<IAccount, "name" | "document" | "type">;

type DocumentType = "CPF" | "CNPJ";

interface IAccount {
  id: string;
  name: string;
  createdAt: Date;
  type: DocumentType;
  document: string;
  address: IAddress;
  isValidDocument: () => boolean;
}

export { IAccount, createAccountInputDTO, DocumentType };
