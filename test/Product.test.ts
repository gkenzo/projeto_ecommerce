import { Product } from "../src/domain";

describe("Testing products", () => {
  it("Should be able to create a new product", () => {
    const product1InputDTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };

    const product = new Product(product1InputDTO);

    expect(product).toBeDefined();
  });
});
