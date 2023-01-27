import { Discount, Order, Product } from "../src/domain";
import { IDiscountInputDTO } from "../src/domain/types";

describe("Testing discounts", () => {
  it("should be able to apply discount coupon of type fixed_price in order", () => {
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const discountDTO: IDiscountInputDTO = {
      type: "FIXED_PRICE",
      amount: 10,
    };
    const product1 = new Product(product1DTO);
    const order = new Order();
    order.addProduct(product1);
    const discount = new Discount(discountDTO);
    order.applyDiscount(discount);
    expect(order.totalPrice).toBe(40);
  });
  it("should be able to apply discount coupon of type percentage in order", () => {
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const discountDTO: IDiscountInputDTO = {
      type: "PERCENTAGE",
      amount: 10,
    };
    const discountDTO2: IDiscountInputDTO = {
      type: "PERCENTAGE",
      amount: 10,
    };
    const product1 = new Product(product1DTO);
    const order = new Order();
    order.addProduct(product1);
    const discount = new Discount(discountDTO);
    const discount2 = new Discount(discountDTO2);
    order.applyDiscount(discount);
    order.applyDiscount(discount2);
    expect(order.totalPrice).toBe(40);
    expect(order.totalDiscount).toBe(10);
  });
  it("should be able to apply multiple discounts order", () => {
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
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
    const product1 = new Product(product1DTO);
    const order = new Order();
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
