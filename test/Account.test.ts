import { Account } from "../src/domain/";
import { createAccountInputDTO } from "../src/domain/types";

describe("testing accounts", () => {
  it("should be able to create a user with valid document", () => {
    const userInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "473.774.340-23",
    };
    const account1 = new Account(userInputDTO);
    expect(account1.isValidDocument()).toBe(true);
  });
  it("should not be able to create a user with invalid document", () => {
    const userInputDTO2: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "111.111.111-11",
    };
    const account2 = new Account(userInputDTO2);
    expect(account2.isValidDocument()).toBe(false);
  });
});
