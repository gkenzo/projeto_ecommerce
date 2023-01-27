import {
  Account,
  AccountBuilder,
  Discount,
  Order,
  Product,
} from "../src/domain";
import { IDiscountInputDTO, createAccountInputDTO } from "../src/domain/types";

let shopper = <Account>{};
let productDTO: { id: string; name: string; price: number };

describe("Testing discounts", () => {
  beforeAll(() => {
    const accountInputDTO: createAccountInputDTO = {
      name: "name",
      type: "CPF",
      document: "12312312311",
    };
    const accountBuilder = AccountBuilder.getInstance();
    shopper = <Account>accountBuilder.tryToBuild(accountInputDTO);
    productDTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
  });
  it("should be able to apply discount coupon of type fixed_price in order", () => {
    const discountDTO: IDiscountInputDTO = {
      type: "FIXED_PRICE",
      amount: 10,
    };
    const product1 = new Product(productDTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    const discount = new Discount(discountDTO);
    order.applyDiscount(discount);
    expect(order.totalPrice).toBe(40);
  });
  it("should be able to apply discount coupon of type percentage in order", () => {
    const discountDTO: IDiscountInputDTO = {
      type: "PERCENTAGE",
      amount: 10,
    };
    const discountDTO2: IDiscountInputDTO = {
      type: "PERCENTAGE",
      amount: 10,
    };
    const product1 = new Product(productDTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    const discount = new Discount(discountDTO);
    const discount2 = new Discount(discountDTO2);
    order.applyDiscount(discount);
    order.applyDiscount(discount2);
    expect(order.totalPrice).toBe(40);
    expect(order.totalDiscount).toBe(10);
  });
  it("should be able to apply multiple discounts order", () => {
    const discountDTO: IDiscountInputDTO = {
      type: "FIXED_PRICE",
      amount: 10,
    };
    const discountDTO2: IDiscountInputDTO = {
      type: "FIXED_PRICE",
      amount: 5,
    };
    const discountDTO3: IDiscountInputDTO = {
      type: "PERCENTAGE",
      amount: 10,
    };
    const product1 = new Product(productDTO);
    const order = new Order(shopper);
    order.addProduct(product1);
    const discount = new Discount(discountDTO);
    const discount2 = new Discount(discountDTO2);
    const discount3 = new Discount(discountDTO3);
    order.applyDiscount(discount);
    order.applyDiscount(discount2);
    order.applyDiscount(discount3);
    expect(order.totalPrice).toBe(30);
    expect(order.totalDiscount).toBe(20);
  });
});
