import { Account } from "../src/domain/";
import { DocumentValidator } from "../src/domain/DocumentValidator";
import { createAccountInputDTO } from "../src/domain/types";

describe("testing accounts", () => {
  const documentValidator = DocumentValidator.getInstance();
  it("should be able to create a user with valid information", () => {
    const userInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "789.925.220-29",
      address: {
        address1: "address1",
        address2: "address2",
        address3: "address3",
        county: "county",
        city: "city",
        state: "state",
        country: "country",
        zipcode: "zipcode",
      },
    };

    const account1 = new Account(userInputDTO);
    expect(
      account1.isValidDocument({
        type: userInputDTO.type,
        document: userInputDTO.document,
        documentValidator,
      })
    ).toBe(true);
  });
});
