import {
  IAccount,
  IAddress,
  DocumentType,
  createAccountInputDTO,
} from "./types";
import { v4 as uuid } from "uuid";
import { CNPJValidator } from "./CNPJValidator";
import { CPFValidator } from "./CPFValidator";

class Account implements IAccount {
  id: string = uuid();
  name: string;
  type: DocumentType;
  document: string;
  address: IAddress = {
    address1: "",
    address2: "",
    address3: "",
    county: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  };
  constructor({ name, type, document }: createAccountInputDTO) {
    this.name = name;
    this.type = type;
    this.document = document;
  }
  isValidDocument = () => {
    if (this.type === "CNPJ") {
      const cnpj = CNPJValidator.getInstance();
      return cnpj.validate(this.document);
    }
    const cpf = CPFValidator.getInstance();
    return cpf.validate(this.document);
  };
  setAddress = (address: IAddress) => {
    for (const addressField in address) {
      this.address[addressField as keyof IAddress] =
        address[addressField as keyof IAddress] || "";
    }
  };
}

export { Account };
