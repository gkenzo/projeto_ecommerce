import { Product, Order, Account, AccountBuilder } from "../src/domain";
import { DocumentValidator } from "../src/domain/DocumentValidator";
import { createAccountInputDTO } from "../src/domain/types";

describe("Testing orders", () => {
  it("should be able to create an order with 3 products", () => {
    const accountInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "851.641.020-05",
    };
    const accountBuilder = AccountBuilder.getInstance();
    const shopper = accountBuilder.tryToBuild(accountInputDTO);
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product2DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product3DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product1 = new Product(product1DTO);
    const product2 = new Product(product2DTO);
    const product3 = new Product(product3DTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    order.addProduct(product2);
    order.addProduct(product3);
    expect(order.products.length).toBe(3);
    expect(order.isValid()).toBe(true);
  });
  it("should be able to remove a product from an order", () => {
    const accountInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "851.641.020-05",
    };
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product2DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const accountBuilder = AccountBuilder.getInstance();
    const shopper = accountBuilder.tryToBuild(accountInputDTO);
    const product1 = new Product(product1DTO);
    const product2 = new Product(product2DTO);
    const order = new Order(shopper as Account);
    order.addProduct(product1);
    order.addProduct(product2);
    order.removeProduct(order.products[0].id);
    expect(order.isValid()).toBe(true);
    expect(order.products.length).toBe(1);
  });
  it("should not be able to create an order with an invalid account", () => {
    const accountInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "12312312311",
    };
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const accountBuilder = AccountBuilder.getInstance();
    const shopper = accountBuilder.tryToBuild(accountInputDTO);
    expect(shopper).toEqual({});
    const product1 = new Product(product1DTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    expect(order.isValid()).toBe(false);
  });
});
