import { Product, Order, Account, Discount } from "../src/domain";
import { IDiscountInputDTO, createAccountInputDTO } from "../src/domain/types";

describe("Testing orders", () => {
  it("should be able to create an order with 3 products", () => {
    const accountInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "851.641.020-05",
    };
    const shopper = new Account(accountInputDTO);
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
    const shopper = new Account(accountInputDTO);
    const product1 = new Product(product1DTO);
    const product2 = new Product(product2DTO);
    const order = new Order(shopper);
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
    const shopper = new Account(accountInputDTO);
    const product1 = new Product(product1DTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    expect(order.isValid()).toBe(false);
  });
  it("should not be able to create an order with an invalid discount coupon", () => {
    const now = new Date();
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
    const discountDTO: IDiscountInputDTO = {
      type: "FIXED_PRICE",
      amount: 10,
      expireDate: now,
    };

    const discount = new Discount(discountDTO);
    const shopper = new Account(accountInputDTO);
    const product1 = new Product(product1DTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    order.applyDiscount(discount);
    expect(discount.isValid).toBe(false);
    expect(discount).toBe(product1.price);
    expect(order.total).toBe(product1.price);
    expect(order.isValid()).toBe(false);
  });
});
