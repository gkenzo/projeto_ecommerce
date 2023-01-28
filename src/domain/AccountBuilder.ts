import { Account } from "./Account";
import { DocumentValidator } from "./DocumentValidator";
import { IBuilder, IDocumentValidator, createAccountInputDTO } from "./types";

class AccountBuilder implements IBuilder {
  private static INSTANCE: AccountBuilder;
  documentValidator: IDocumentValidator;

  private constructor() {
    this.documentValidator = DocumentValidator.getInstance();
  }
  static getInstance = (): AccountBuilder => {
    if (!AccountBuilder.INSTANCE)
      AccountBuilder.INSTANCE = new AccountBuilder();
    return AccountBuilder.INSTANCE;
  };

  tryToBuild = (account: createAccountInputDTO): Account | {} => {
    const { type, document } = account;
    const newAccount = new Account(account);
    const shouldBuild = newAccount.isValidDocument({
      documentValidator: this.documentValidator,
    });
    return shouldBuild ? newAccount : {};
  };
}

export { AccountBuilder };
