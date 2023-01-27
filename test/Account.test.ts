import { Account } from "../src/domain/";
import { DocumentValidator } from "../src/domain/DocumentValidator";
import { createAccountInputDTO } from "../src/domain/types";

describe("testing accounts", () => {
  const documentValidator = DocumentValidator.getInstance();
  it("should be able to create a user with valid document", () => {
    const userInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "851.641.020-05",
    };
    const account1 = new Account(userInputDTO);
    expect(
      account1.isValidDocument({
        type: userInputDTO.type,
        document: userInputDTO.document,
        documentValidator,
      })
    ).toBe(true);
    const userInputDTO2: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "111.111.111-11",
    };
    const account2 = new Account(userInputDTO2);
    expect(
      account2.isValidDocument({
        type: userInputDTO2.type,
        document: userInputDTO2.document,
        documentValidator,
      })
    ).toBe(false);
  });
  it("should not be able to create a user with invalid document", () => {
    const userInputDTO2: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "111.111.111-11",
    };
    const account2 = new Account(userInputDTO2);
    expect(
      account2.isValidDocument({
        type: userInputDTO2.type,
        document: userInputDTO2.document,
        documentValidator,
      })
    ).toBe(false);
  });
});
